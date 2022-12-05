import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageFileComp.scss';
import FullPreviewImg from '../FullPreviewImg';
import 'react-toastify/dist/ReactToastify.css';
import CommonUtils from './../../../utils/CommonUtils';

class ImageFileComp extends Component {
  state = {
    imgUrl: null,
    imgName: null,
    fileToImgBlobUrl: null,
    isFullPreview: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { toggleClear } = this.props;
    if (toggleClear !== prevProps.toggleClear) {
      this.setState({
        imgUrl: null,
        fileToImgBlobUrl: null,
        isFullPreview: false,
      });
    }
  };

  handleImageUploaded = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { getImgFile, onlyGetImgName } = this.props;
      getImgFile(file);

      if (onlyGetImgName) {
        this.setState({
          imgUrl: null,
          imgName: file.name,
        });
      } else {
        const fileToImgBlobUrl = CommonUtils.convertFileToImgBlobUrl(file);
        if (fileToImgBlobUrl) {
          this.setState({
            imgUrl: fileToImgBlobUrl, //v109xx2
            imgName: null,
          });
        }
      }

      e.target.value = null;
    }
  };

  previewClick = () => {
    this.setState({ isFullPreview: !this.state.isFullPreview });
  };

  renderImg = (imgUrl) => {
    return (
      <span
        className='preview-image'
        style={{ backgroundImage: `url(${imgUrl})` }}
        onClick={this.previewClick}
      ></span>
    );
  };

  renderFullPreviewImg = (imgUrl) => {
    return <FullPreviewImg imgUrl={imgUrl} previewClick={this.previewClick} />;
  };

  render() {
    const { imgUrl, isFullPreview, imgName } = this.state;

    return (
      <div className='imageFile-content'>
        <input
          ref='file'
          type='file'
          name='image'
          id='imgFor'
          hidden
          onChange={this.handleImageUploaded}
        />
        <span className='imageFile-flex'>
          <label className='imageFile-label-upload' htmlFor='imgFor'>
            <i className='fas fa-upload'></i> Upload file
          </label>
          <h6>{imgName && imgName}</h6>
        </span>

        {imgUrl && this.renderImg(imgUrl)}
        {isFullPreview && imgUrl && this.renderFullPreviewImg(imgUrl)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

export default connect(mapStateToProps, null)(ImageFileComp);
