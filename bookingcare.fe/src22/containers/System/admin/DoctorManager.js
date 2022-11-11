import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './DoctorManager.scss';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { doctorManagerLangs } from '../../../connectSupplyFE/otherSupplies';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

const mdParser = new MarkdownIt();
class DoctorManager extends Component {
  state = {
    contentHTML: '',
    contentMarkdown: '',
    description: '',
    doctorId: null,
    selectedDoctor: null,
    doctorOptions: [],
    isEdited: false,
  };

  componentDidMount = async () => {
    const { fetchAllDoctorsFn, allDoctors } = this.props;
    if (allDoctors.length === 0) {
      await fetchAllDoctorsFn();
    } else if (allDoctors.length > 0) {
      this.loadingDoctorOptions();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { allDoctors, language } = this.props;
    if (prevProps.allDoctors.length !== allDoctors.length) {
      this.loadingDoctorOptions();
    } else if (allDoctors.length > 0) {
      if (prevProps.language !== language) {
        this.loadingDoctorOptions();
      }
    }
  };

  doctorOptionsByLangs = (doctorArr, selectedDoctor) => {
    const { language } = this.props;
    let doctorOptions = [];
    let doctorId = null;
    let selectedDoctor = null;

    if (selectedDoctor) {
      doctorId = selectedDoctor.doctorId;
    }

    if (language === LANGUAGES.EN) {
      doctorOptions = doctorArr.map((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        if (doctorId === item.id) {
          selectedDoctor = {
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
      doctorOptions = doctorArr.map((item) => {
        const fullName = `${item.lastName} ${item.firstName}`;

        if (doctorId === item.id) {
          selectedDoctor = {
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
      doctorOptions,
      selectedDoctor,
    };
  };

  loadingDoctorOptions = () => {
    const { allDoctors } = this.props;
    const { selectedDoctor } = this.state;

    const { doctorOptions, selectedDoctor } = this.doctorOptionsByLangs(
      allDoctors,
      selectedDoctor,
    );

    this.setState({
      doctorOptions: doctorOptions,
      selectedDoctor: selectedDoctor,
      doctorId: selectedDoctor ? selectedDoctor.doctorId : null,
    });
  };

  customSelectByHOC = ({ props }) => {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        width: '250px',
        boxShadow: '1px 1px gray',
        '&:hover': {
          borderColor: 'blue',
        },
      }),
    };
    return <Select {...props} styles={customStyles} />;
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

  handleSelectedDoctor = async (selectedDoctor) => {
    await this.editingAlert();

    if (selectedDoctor.doctorId) {
      const id = selectedDoctor.doctorId;
      const data = await this.props.editDoctorDetailsFn(id);
      const { contentHTML, contentMarkdown, description } = data.user;

      this.setState({
        contentHTML: contentHTML ? contentHTML : 'No content',
        contentMarkdown: contentMarkdown ? contentMarkdown : 'No content',
        description: description ? description : 'No description',
        selectedDoctor,
        doctorId: selectedDoctor.doctorId,
      });
    } else {
      return null;
    }
  };

  renderSelections = () => {
    const { doctorOptions, selectedDoctor } = this.state;
    const mySelect = (
      <Select
        value={selectedDoctor}
        options={doctorOptions}
        onChange={this.handleSelectedDoctor}
      />
    );
    return this.customSelectByHOC(mySelect);
  };

  savingData = async () => {
    const { updateDoctorDetailsFn } = this.props;
    const { selectedDoctor, doctorOptions, ...stateSubmited } = this.state;

    console.log('stateSubmited ---', stateSubmited);
    const data = await updateDoctorDetailsFn(stateSubmited);
    if (data.errCode === 0) {
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
      contentHTML: '',
      contentMarkdown: '',
      description: '',
      selectedDoctor: null,
      doctorId: null,
      isEdited: false,
    });
  };

  handleEditorChange = ({ text, html }) => {
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
        onChange={this.handleEditorChange}
      />
    );
  };

  infoDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  renderTextarea = () => {
    return (
      <textarea
        rows='4'
        name='description'
        className='form-control'
        value={this.state.description}
        onChange={this.infoDescription}
      ></textarea>
    );
  };

  render() {
    const { mainTitleL, doctorsL, descriptionL, cancelL, saveL } =
      doctorManagerLangs;
    return (
      <div className='doctor-manager text-center mt-3'>
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
            {this.renderSelections()}
          </div>
          <div className='doctorManager-detail-desc'>
            <h5>
              <FormattedMessage id={descriptionL} />
            </h5>
            {this.renderTextarea()}
          </div>
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
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editDoctorDetailsFn: (doctorId) =>
      dispatch(actions.editDoctorDetailsFn(doctorId)),
    updateDoctorDetailsFn: (newData) =>
      dispatch(actions.updateDoctorDetailsFn(newData)),
    fetchAllDoctorsFn: () => dispatch(actions.fetchAllDoctorsFn()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorManager);
