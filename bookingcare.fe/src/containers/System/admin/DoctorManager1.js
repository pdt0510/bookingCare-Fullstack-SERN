//DoctorManager1, src20, 5ms46ss
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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt();
class DoctorManager extends Component {
  // 34ms47ss
  state = {
    htmlContent: '',
    textContent: '',
    selectedOption: '',
    selectedVal: '',
    infoDesc: '',
  };

  // 34ms47ss
  savingInfo = () => {
    const { selectedOption, ...stateSubmited } = this.state;
    console.log(stateSubmited);
    this.clearForm();
  };

  // 34ms47ss
  cancel = () => {
    const isDel = window.confirm('you want to delete info ?');
    if (isDel) {
      this.clearForm();
    }
  };

  // 34ms47ss
  clearForm = () => {
    this.setState({
      htmlContent: '',
      textContent: '',
      selectedOption: '',
      infoDesc: '',
    });
  };

  handleEditorChange = ({ text, html }) => {
    //34ms47ss
    this.setState({
      htmlContent: html,
      textContent: text,
    });

    //10ms57ss
    // console.log('html', html);
    // console.log('text', text);
  };

  // 34ms47ss
  handleChange = (selectedOption) => {
    this.setState({ selectedOption, selectedVal: selectedOption.value });
  };

  // 34ms47ss
  renderSelections = () => {
    return (
      <Select
        className='doctor-info-selectVal'
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  };

  renderTextarea = () => {
    return (
      <textarea
        rows='4'
        name='description'
        className='form-control'
        value={this.state.infoDesc}
        onChange={this.infoDescription}
      ></textarea>
    );
  };

  renderMdEditor = () => {
    return (
      <MdEditor
        style={{ height: '590px' }}
        value={this.state.textContent} //v75xx1
        renderHTML={(htmlStr) => mdParser.render(htmlStr)}
        onChange={this.handleEditorChange} //10ms57ss
        // onChange={() => this.handleEditorChange}
      />
    );
  };

  // 34ms47ss
  infoDescription = (event) => {
    this.setState({ infoDesc: event.target.value });
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManager);
