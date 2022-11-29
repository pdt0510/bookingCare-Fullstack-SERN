import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './SpecialityManager.scss';
import ImageFileComp from './ImageFileComp';
import MdEditorComp from './MdEditorComp';
import CommonUtils from '../../../utils/CommonUtils';
import { createSpecialityServ } from '../../../services/userService';

let contentHtml = null;
let contentText = null;

//src27, 4ms18ss
class SpecialityManager extends Component {
  state = {
    imgFile: null,
    selectedItem: null,
    specialityName: '',
    toggleClear: false,
  };

  getImgFile = (imgFile) => {
    this.setState({ imgFile });
  };

  getSelectedValue = (value) => {
    this.setState({ specialityName: value });
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
      specialityName: '',
      toggleClear: !this.state.toggleClear,
    });
  };

  savingAllData = async () => {
    let convertToBase64 = null;
    const { imgFile, specialityName } = this.state;

    if (imgFile !== null) {
      convertToBase64 = await CommonUtils.convertBlobToBase64(imgFile);
    }

    const dataUpdated = {
      name: specialityName,
      image: convertToBase64,
      htmlDesc: contentHtml,
      textDesc: contentText,
    };

    const isChecked = this.checkingEditValues(dataUpdated);

    if (isChecked) {
      const data = await createSpecialityServ(dataUpdated); //6ms48
      if (data.errCode === 0) {
        console.log('data ---', data);
        this.clearForm();
      }
    }
  };

  render() {
    const { specialityName, toggleClear } = this.state;

    return (
      <div className='specialityManager-content container'>
        <h3 className='text-center'>Speciality Manager</h3>
        <div className='specialityManager-image col-6'>
          <h5>Speciality image</h5>
          <ImageFileComp
            toggleClear={toggleClear}
            getImgFile={this.getImgFile}
          />
        </div>
        <div className='specialityManager-info col-6 form-group'>
          <h5> Speciality name</h5>
          <input
            type='text'
            id='specialityNameFor'
            className='form-control'
            name='specialityName'
            value={specialityName}
            placeholder='Speciality name'
            onChange={this.inputHandle}
          />
        </div>

        <div className='specialityManager-editor col-12'>
          <h5>Speciality content</h5>
          <MdEditorComp
            toggleClear={toggleClear}
            getMditorData={this.getMditorData}
          />
        </div>
        <div className='doctorManager-btns col-12'>
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
export default connect(mapStateToProps, mapDispatchToProps)(SpecialityManager);
