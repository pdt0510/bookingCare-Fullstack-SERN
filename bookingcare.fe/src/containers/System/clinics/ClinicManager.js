import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './ClinicManager.scss';
import ImageFileComp from '../generalComps/ImageFileComp';
import MdEditorComp from '../generalComps/MdEditorComp';
import CommonUtils from '../../../utils/CommonUtils';
import { createClinicServ } from '../../../services/userService';

let contentHtml = null;
let contentText = null;

//src28, v105xx1
class ClinicManager extends Component {
  state = {
    imgFile: null,
    selectedItem: null,
    clinicName: '',
    clinicAddress: '',
    toggleClear: false,
  };

  getImgFile = (imgFile) => {
    this.setState({ imgFile });
  };

  getMditorData = ({ text, html }) => {
    contentText = text;
    contentHtml = html;
  };

  inputHandle = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkingEditValues = (state) => {
    let isValid = false;
    for (let key in state) {
      if (!state[key]) {
        if (key === 'id') {
          continue;
        } else {
          alert(`Missing param: ${key.toUpperCase()}`);
        }
        return isValid;
      }
    }
    return (isValid = true);
  };

  clearFn = () => {
    const isDel = window.confirm(
      `you want to clear form ? - Data will be not lost`,
    );

    if (isDel) {
      this.clearForm();
    }
  };

  clearForm = () => {
    this.setState({
      imgFile: null,
      selectedItem: null,
      clinicName: '',
      clinicAddress: '',
      toggleClear: !this.state.toggleClear,
    });
  };

  savingAllData = async () => {
    let convertToBase64 = null;
    const { imgFile, clinicName, clinicAddress } = this.state;

    if (imgFile !== null) {
      convertToBase64 = await CommonUtils.convertFileToString(imgFile); //v109xx2
    }

    const dataCreated = {
      name: clinicName,
      address: clinicAddress,
      image: convertToBase64, //v109xx2
      htmlDesc: contentHtml,
      textDesc: contentText,
    };

    const isChecked = this.checkingEditValues(dataCreated);

    if (isChecked) {
      const data = await createClinicServ(dataCreated);
      if (data.errCode === 0) {
        this.clearForm();
      }
    }
  };

  render() {
    const { clinicName, clinicAddress, toggleClear } = this.state;

    return (
      <div className='clinicManager-content container'>
        <h3 className='text-center'>Clinic Manager</h3>
        <div className='clinicManager-image'>
          <h5>Clinic image</h5>
          <ImageFileComp
            toggleClear={toggleClear}
            getImgFile={this.getImgFile}
          />
        </div>

        {/* v105xx1 */}
        <div className='clinicManager-input'>
          <div className='clinicManager-info form-group'>
            <label htmlFor='clinicNameFor'>
              <h5> Clinic name</h5>
            </label>
            <input
              type='text'
              id='clinicNameFor'
              className='form-control'
              name='clinicName'
              value={clinicName}
              placeholder='Clinic name'
              onChange={this.inputHandle}
            />
          </div>
          <div className='clinicManager-info form-group'>
            <label htmlFor='clinicAddressFor'>
              <h5> Clinic address</h5>{' '}
            </label>
            <input
              type='text'
              id='clinicAddressFor'
              className='form-control'
              name='clinicAddress'
              value={clinicAddress}
              placeholder='Clinic address'
              onChange={this.inputHandle}
            />
          </div>
        </div>
        <div className='clinicManager-editor'>
          <h5>Clinic content</h5>
          <MdEditorComp
            toggleClear={toggleClear}
            getMditorData={this.getMditorData}
          />
        </div>
        <div className='doctorManager-btns'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={this.clearFn}
          >
            Clear all
          </button>
          <button
            type='button'
            className='btn btn-primary ml-2'
            onClick={this.savingAllData}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ClinicManager);
