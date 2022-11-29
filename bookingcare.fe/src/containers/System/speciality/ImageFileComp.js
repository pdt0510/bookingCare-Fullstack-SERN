import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageFileComp.scss';
import FullPreviewImg from '../FullPreviewImg';
import 'react-toastify/dist/ReactToastify.css';

class ImageFileComp extends Component {
  state = {
    imgUrl: null,
    fileToImgUrl: null,
    isFullPreview: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { toggleClear } = this.props;
    if (toggleClear !== prevProps.toggleClear) {
      this.setState({
        imgUrl: null,
        fileToImgUrl: null,
        isFullPreview: false,
      });
    }
  };

  handleImageUploaded = async (e) => {
    const file = e.target.files[0];
    if (file) {
      this.props.getImgFile(file);
      const fileToImgUrl = URL.createObjectURL(file);

      if (fileToImgUrl) {
        this.setState({
          imgUrl: fileToImgUrl,
        });
      }

      e.target.value = null;
    }
  };

  previewClick = () => {
    this.setState({ isFullPreview: !this.state.isFullPreview });
  };

  renderImgUrl = (imgUrl) => {
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
    const { imgUrl, isFullPreview } = this.state;

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
        <label className='imageFile-label-upload' htmlFor='imgFor'>
          <i className='fas fa-upload'></i> Upload file
        </label>
        {imgUrl && this.renderImgUrl(imgUrl)}
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
