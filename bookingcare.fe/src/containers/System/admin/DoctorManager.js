import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './DoctorManager.scss';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { userManageLangs } from '../../../connectSupplyFE/otherSupplies';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

//DoctorManager2.js, src20
const mdParser = new MarkdownIt();
class DoctorManager extends Component {
  state = {
    contentHTML: '',
    contentMarkdown: '',
    description: '',
    doctorId: '',
    doctorOptions: [],
    selectedDoctor: '',
  };

  componentDidMount = async () => {
    const { fetchAllDoctorsFn, allDoctors } = this.props;
    if (allDoctors.length === 0) {
      await fetchAllDoctorsFn(); //18ms04ss
    } else if (allDoctors.length > 0) {
      this.loadingDoctorOptions(); //20ms48ss
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { allDoctors, language } = this.props;
    if (prevProps.allDoctors.length !== allDoctors.length) {
      this.loadingDoctorOptions();
    } else if (allDoctors.length > 0) {
      if (prevProps.language !== language) {
        this.loadingDoctorOptions(); //20ms48ss
      }
    }
  };

  doctorOptionsByLangs = (doctorArr, selectedDoctor) => {
    const { language } = this.props;
    let doctorId = null;
    let doctorOptions = [];
    let selectedDoctorLangs = null;

    // v76xx2,
    if (selectedDoctor) {
      doctorId = selectedDoctor.doctorId;
    }

    if (language === LANGUAGES.EN) {
      doctorOptions = doctorArr.map((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        if (doctorId === item.id) {
          selectedDoctorLangs = {
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
          selectedDoctorLangs = {
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
      selectedDoctorLangs,
    };
  };

  // 20ms48ss
  loadingDoctorOptions = () => {
    const { allDoctors } = this.props;
    const { selectedDoctor } = this.state;

    const { doctorOptions, selectedDoctorLangs } = this.doctorOptionsByLangs(
      allDoctors,
      selectedDoctor,
    );

    this.setState({
      doctorOptions: doctorOptions,
      selectedDoctor: selectedDoctorLangs,
      doctorId: selectedDoctorLangs ? selectedDoctorLangs.doctorId : null,
    });
  };

  handleSelectedDoctor = (selectedDoctor) => {
    this.setState({
      selectedDoctor,
      doctorId: selectedDoctor.doctorId,
    });
  };

  //v76xx1
  customSelectByHOC = ({ props }) => {
    // bổ sung 'customStyles' prop trước khi return -> it's HOC
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

  renderSelections = () => {
    const { doctorOptions, selectedDoctor } = this.state;
    const mySelect = (
      <Select
        value={selectedDoctor}
        options={doctorOptions}
        onChange={this.handleSelectedDoctor}
      />
    );
    return this.customSelectByHOC(mySelect); //v76xx1
    // return mySelect;
  };

  savingInfo = async () => {
    const { selectedDoctor, doctorOptions, ...stateSubmited } = this.state;
    const { updateDoctorInfoFn } = this.props;
    console.log('stateSubmited ---', stateSubmited);
    const data = await updateDoctorInfoFn(stateSubmited); //31ms55ss
    if (data.errCode === 0) {
      // this.clearForm();
    }
  };

  cancel = () => {
    const isDel = window.confirm('you want to delete info ?');
    if (isDel) {
      this.clearForm();
    }
  };

  clearForm = () => {
    this.setState({
      contentHTML: '',
      contentMarkdown: '',
      description: '',
      selectedDoctor: '',
      doctorId: '',
    });
  };

  handleEditorChange = ({ text, html }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
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

  render() {
    return (
      <div className='doctor-manager text-center mt-3'>
        <div className='doctor-manager-title'>
          <h3>Doctor info manager</h3>
        </div>

        {/* 20ms22ss */}
        <div className='doctor-manager-info'>
          <div className='doctor-info-select'>
            <h5 className='doctor-info-label'>Doctors</h5>
            {this.renderSelections()}
          </div>

          {/* 20ms22ss, 24ms41ss */}
          <div className='doctor-info-desc'>
            <h5>Description</h5>
            {this.renderTextarea()}
          </div>
        </div>

        <div className='doctor-manager-editor'>{this.renderMdEditor()}</div>
        {/* 14ms39ss */}
        <div className='doctor-manager-btns'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={this.cancel}
          >
            Clear all
          </button>
          <button
            type='button'
            className='btn btn-primary ml-2'
            onClick={this.savingInfo}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors, //18ms04ss
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDoctorInfoFn: (newData) =>
      dispatch(actions.updateDoctorInfoFn(newData)), // 31ms55ss
    fetchAllDoctorsFn: () => dispatch(actions.fetchAllDoctorsFn()), //18ms04ss
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorManager);
