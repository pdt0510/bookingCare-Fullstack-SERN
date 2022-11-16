import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './DoctorManager.scss';
import Select from 'react-select';
import { FormattedMessage, injectIntl } from 'react-intl';
import { doctorManagerLangs } from '../../../connectSupplyFE/otherSupplies';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import {
  ALLCODE_DEFAULTS,
  CURRENCY,
  DOCTOR_DEFAULTS,
} from './../../../utils/constant';
import { compose } from 'redux';

const mdParser = new MarkdownIt();
class DoctorManager extends Component {
  state = {
    doctorId: null,
    isEdited: false,

    contentHTML: '',
    contentMarkdown: '',
    description: '',
    selectedDoctor: null,
    doctorOptions: [],

    priceSelected: null,
    priceOptions: [],

    payMethodSelected: null,
    payMethodOptions: [],

    provinceSelected: null,
    provinceOptions: [],

    clinicName: '',
    clinicAddress: '',
    note: '',
  };

  componentDidMount = async () => {
    const { fetchAllDoctorsFn, allDoctors, fetchDoctorInfoAllcodeFn } =
      this.props;
    if (allDoctors.length === 0) {
      await fetchDoctorInfoAllcodeFn();
      await fetchAllDoctorsFn();
    } else if (allDoctors.length > 0) {
      this.postingAllDataToState();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { allDoctors, language } = this.props;
    if (prevProps.allDoctors.length !== allDoctors.length) {
      this.postingAllDataToState();
    } else if (allDoctors.length > 0) {
      if (prevProps.language !== language) {
        this.postingAllDataToState();
      }
    }
  };

  postingAllDataToState = () => {
    const { allDoctors } = this.props;

    if (allDoctors && allDoctors.length > 0) {
      const {
        selectedDoctor,
        priceSelected,
        payMethodSelected,
        provinceSelected,
      } = this.state;

      const { priceList, paymentList, provinceList } = this.props;
      const doctorData = this.doctorDetailOptions(allDoctors, selectedDoctor);

      const priceData = this.doctorInfoOptions(priceList, priceSelected);

      const paymentData = this.doctorInfoOptions(
        paymentList,
        payMethodSelected,
      );

      const provinceData = this.doctorInfoOptions(
        provinceList,
        provinceSelected,
      );

      this.setState({
        doctorOptions: doctorData.tempOptions,
        selectedDoctor: doctorData.tempSelected,
        doctorId: doctorData.tempSelected
          ? doctorData.tempSelected.doctorId
          : null,

        priceOptions: priceData.tempList,
        priceSelected: priceData.tempSelectedOne,

        payMethodOptions: paymentData.tempList,
        payMethodSelected: paymentData.tempSelectedOne,

        provinceOptions: provinceData.tempList,
        provinceSelected: provinceData.tempSelectedOne,
      });
    }
  };

  doctorDetailOptions = (doctorOptions, selectedDoctor) => {
    const { language } = this.props;
    let tempOptions = [];
    let doctorId = null;
    let tempSelected = null;

    if (selectedDoctor) {
      doctorId = selectedDoctor.doctorId;
    }

    if (language === LANGUAGES.EN) {
      tempOptions = doctorOptions.map((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        if (doctorId === item.id) {
          tempSelected = {
            value: fullName,
            label: fullName,
            doctorId: item.id,
          };
        }

        return {
          value: fullName,
          label: fullName,
          doctorId: item.id,
        };
      });
    } else {
      tempOptions = doctorOptions.map((item) => {
        const fullName = `${item.lastName} ${item.firstName}`;

        if (doctorId === item.id) {
          tempSelected = {
            value: fullName,
            label: fullName,
            doctorId: item.id,
          };
        }

        return {
          value: fullName,
          label: fullName,
          doctorId: item.id,
        };
      });
    }

    return {
      tempOptions,
      tempSelected,
    };
  };

  doctorInfoOptions = (list, selectedOne) => {
    const { vnd, dollar, dataType } = CURRENCY;
    const { language } = this.props;

    const tempList = list.map((item, idx) => {
      let viCurrency = null;
      let $Currency = null;

      if (item.type === dataType) {
        if (language === LANGUAGES.EN) {
          $Currency = `${item.valueEN} ${dollar}`;
        } else {
          viCurrency = item.valueVI.slice(0, 3) + `.000 ${vnd}`;
        }

        return {
          idx,
          value: item.keymap,
          label: language === LANGUAGES.EN ? $Currency : viCurrency,
        };
      }

      return {
        idx,
        value: item.keymap,
        label: language === LANGUAGES.EN ? item.valueEN : item.valueVI,
      };
    });

    const tempSelectedOne = selectedOne
      ? tempList[selectedOne.idx]
      : tempList[0];

    return {
      tempList,
      tempSelectedOne,
    };
  };

  selectedDoctorOnchange = async (selectedDoctor) => {
    await this.editingAlert();

    if (selectedDoctor.doctorId) {
      const { editDoctorDetailsFn, editDoctorInfoFn } = this.props;
      const id = selectedDoctor.doctorId;
      const details = await editDoctorDetailsFn(id);
      const info = await editDoctorInfoFn(id);
      let doctorDetail = details.user;
      let doctorInfo = info.doctorInfo;

      if (doctorDetail === null) {
        doctorDetail = DOCTOR_DEFAULTS.doctorDetail;
      }

      if (doctorInfo === null) {
        doctorInfo = DOCTOR_DEFAULTS.doctorInfo;
      }

      const selectedOnes = this.getInfoSelectedForUi({
        paymentId: doctorInfo.paymentId,
        priceId: doctorInfo.priceId,
        provinceId: doctorInfo.provinceId,
      });

      this.setState({
        selectedDoctor,
        doctorId: selectedDoctor.doctorId,

        contentHTML: doctorDetail.contentHTML,
        contentMarkdown: doctorDetail.contentMarkdown,
        description: doctorDetail.description,

        priceSelected: selectedOnes.price,
        payMethodSelected: selectedOnes.payment,
        provinceSelected: selectedOnes.province,

        clinicName: doctorInfo.clinicName,
        clinicAddress: doctorInfo.clinicAddress,
        note: doctorInfo.note,
      });
    }
  };

  getInfoSelectedForUi = (selectedOnes) => {
    const { priceId, paymentId, provinceId } = selectedOnes;
    const { priceOptions, payMethodOptions, provinceOptions } = this.state;
    const priceLength = priceOptions.length;
    const payMethodLength = payMethodOptions.length;
    const provinceLength = provinceOptions.length;

    const tempSelectedOnes = {
      price: null,
      payment: null,
      province: null,
    };

    let idx = 0;
    while (idx < priceLength) {
      if (priceId === priceOptions[idx].value) {
        tempSelectedOnes.price = priceOptions[idx];
        break;
      }
      idx++;
    }

    idx = 0;
    while (idx < payMethodLength) {
      if (paymentId === payMethodOptions[idx].value) {
        tempSelectedOnes.payment = payMethodOptions[idx];
        break;
      }
      idx++;
    }

    idx = 0;
    while (idx < provinceLength) {
      if (provinceId === provinceOptions[idx].value) {
        tempSelectedOnes.province = provinceOptions[idx];
        break;
      }
      idx++;
    }

    return tempSelectedOnes;
  };

  editingAlert = async () => {
    if (this.state.isEdited) {
      const isSave = window.confirm(
        'something is edited, do you want to save ?',
      );
      if (isSave) {
        await this.savingData();
      } else {
        this.setState({ isEdited: false });
      }
    }
  };

  renderDoctorSelections = (options, selectedOne) => {
    const { formatMessage } = this.props.intl;
    const { chooseADoctorL } = doctorManagerLangs;
    const mySelect = (
      <Select
        width='250px'
        value={selectedOne}
        options={options}
        placeholder={formatMessage({ id: chooseADoctorL })}
        onChange={this.selectedDoctorOnchange}
      />
    );
    return this.customSelectByHOC(mySelect);
  };

  customSelectByHOC = ({ props }) => {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        boxShadow: '1px 1px gray',
        width: props.width ? props.width : '',
        '&:hover': {
          borderColor: 'blue',
        },
      }),
    };
    return <Select {...props} styles={customStyles} />;
  };

  savingData = async () => {
    const { updateDoctorDetailsFn, updateDoctorInfoFn } = this.props;
    const {
      doctorId,
      contentHTML,
      contentMarkdown,
      description,

      priceSelected,
      payMethodSelected,
      provinceSelected,
      clinicName,
      clinicAddress,
      note,
    } = this.state;

    const markdownForUpdate = {
      doctorId,
      contentHTML,
      contentMarkdown,
      description,
    };

    const doctorInfoForUpdate = {
      doctorId,
      priceId: priceSelected.value,
      paymentId: payMethodSelected.value,
      provinceId: provinceSelected.value,
      clinicAddress,
      clinicName,
      note,
    };

    const detail = await updateDoctorDetailsFn(markdownForUpdate);
    const info = await updateDoctorInfoFn(doctorInfoForUpdate);
    if (detail.errCode === 0 && info.errCode === 0) {
      this.clearForm();
    }
  };

  cancel = () => {
    const isDel = window.confirm(
      `you want to clear form's info ? - data will be not lost`,
    );
    if (isDel) {
      this.clearForm();
    }
  };

  clearForm = () => {
    this.setState({
      doctorId: null,
      isEdited: false,

      selectedDoctor: null,
      contentHTML: '',
      contentMarkdown: '',
      description: '',

      priceSelected: null,
      payMethodSelected: null,
      provinceSelected: null,
      clinicName: '',
      clinicAddress: '',
      note: '',
    });
  };

  editorOnchange = ({ text, html }) => {
    this.setState({
      isEdited: true,
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  renderMdEditor = () => {
    return (
      <MdEditor
        style={{ height: '590px' }}
        value={this.state.contentMarkdown}
        renderHTML={(htmlStr) => mdParser.render(htmlStr)}
        onChange={this.editorOnchange}
      />
    );
  };

  descOnchange = (event) => {
    this.setState({ description: event.target.value });
  };

  renderTextarea = () => {
    return (
      <textarea
        rows='4'
        name='description'
        className='form-control'
        value={this.state.description}
        onChange={this.descOnchange}
      ></textarea>
    );
  };

  DoctorInfoSelectedOnchange = (selectedOne) => {
    const { PRIcol, PAYcol, PROcol } = ALLCODE_DEFAULTS;
    if (selectedOne.value.includes(PRIcol)) {
      this.setState({
        priceSelected: selectedOne,
      });
    } else if (selectedOne.value.includes(PAYcol)) {
      this.setState({
        payMethodSelected: selectedOne,
      });
    } else if (selectedOne.value.includes(PROcol)) {
      this.setState({
        provinceSelected: selectedOne,
      });
    }
  };

  renderDoctorInfoSelections = (options, selectedOne) => {
    return (
      <Select
        value={selectedOne}
        options={options}
        onChange={this.DoctorInfoSelectedOnchange}
      />
    );
  };

  inputOnchange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      mainTitleL,
      doctorsL,
      descriptionL,
      cancelL,
      saveL,
      priceL,
      payMethodL,
      provinceL,
      clinicNameL,
      clinicAddressL,
      noteL,
    } = doctorManagerLangs;

    const {
      doctorOptions,
      selectedDoctor,
      priceOptions,
      priceSelected,
      payMethodOptions,
      payMethodSelected,
      provinceOptions,
      provinceSelected,
      clinicName,
      clinicAddress,
      note,
    } = this.state;

    const { formatMessage } = this.props.intl;

    return (
      <div className='container doctorManager'>
        <div className='doctorManager-title'>
          <h3>
            <FormattedMessage id={mainTitleL} />
          </h3>
        </div>
        <div className='doctorManager-info'>
          <div className='doctorManager-detail-select'>
            <h5 className='doctorManager-detail-label'>
              <FormattedMessage id={doctorsL} />
            </h5>
            {this.renderDoctorSelections(doctorOptions, selectedDoctor)}
          </div>
          <div className='doctorManager-detail-desc'>
            <h5>
              <FormattedMessage id={descriptionL} />
            </h5>
            {this.renderTextarea()}
          </div>

          {/* 31ms35ss */}
          <form className='doctorManager-info-form'>
            <div className='row'>
              <div className='col'>
                <h5 htmlFor='price'>
                  <FormattedMessage id={priceL} />
                </h5>
                {priceOptions &&
                  priceOptions.length > 0 &&
                  this.renderDoctorInfoSelections(priceOptions, priceSelected)}
              </div>
              <div className='col'>
                <h5 htmlFor='payMethod'>
                  <FormattedMessage id={payMethodL} />
                </h5>
                {payMethodOptions &&
                  payMethodOptions.length > 0 &&
                  this.renderDoctorInfoSelections(
                    payMethodOptions,
                    payMethodSelected,
                  )}
              </div>
              <div className='col'>
                <h5 htmlFor='province'>
                  <FormattedMessage id={provinceL} />
                </h5>
                {provinceOptions &&
                  provinceOptions.length > 0 &&
                  this.renderDoctorInfoSelections(
                    provinceOptions,
                    provinceSelected,
                  )}
              </div>
            </div>
            <div className='row doctorManager-info-input'>
              <div className='col'>
                <h5>
                  <FormattedMessage id={clinicNameL} />
                </h5>
                <input
                  type='text'
                  name='clinicName'
                  className='form-control'
                  value={clinicName}
                  placeholder={formatMessage({ id: clinicNameL })}
                  onChange={this.inputOnchange}
                />
              </div>
              <div className='col'>
                <h5>
                  <FormattedMessage id={clinicAddressL} />
                </h5>
                <input
                  type='text'
                  name='clinicAddress'
                  className='form-control'
                  value={clinicAddress}
                  placeholder={formatMessage({ id: clinicAddressL })}
                  onChange={this.inputOnchange}
                />
              </div>
              <div className='col'>
                <h5>
                  <FormattedMessage id={noteL} />
                </h5>
                <input
                  type='text'
                  name='note'
                  value={note}
                  placeholder={formatMessage({ id: noteL })}
                  onChange={this.inputOnchange}
                  className='form-control'
                />
              </div>
            </div>
          </form>
        </div>
        <div className='doctorManager-editor'>{this.renderMdEditor()}</div>
        <div className='doctorManager-btns'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={this.cancel}
          >
            <FormattedMessage id={cancelL} />
          </button>
          <button
            type='button'
            className='btn btn-primary ml-2'
            onClick={this.savingData}
          >
            <FormattedMessage id={saveL} />
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    priceList: state.admin.priceList,
    paymentList: state.admin.paymentList,
    provinceList: state.admin.provinceList,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDoctorInfoFn: (doctorInfo) =>
      dispatch(actions.updateDoctorInfoFn(doctorInfo)),
    editDoctorInfoFn: (doctorId) =>
      dispatch(actions.editDoctorInfoFn(doctorId)),
    fetchDoctorInfoAllcodeFn: () =>
      dispatch(actions.fetchDoctorInfoAllcodeFn()),
    editDoctorDetailsFn: (doctorId) =>
      dispatch(actions.editDoctorDetailsFn(doctorId)),
    updateDoctorDetailsFn: (newData) =>
      dispatch(actions.updateDoctorDetailsFn(newData)),
    fetchAllDoctorsFn: () => dispatch(actions.fetchAllDoctorsFn()),
  };
};

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(DoctorManager);
