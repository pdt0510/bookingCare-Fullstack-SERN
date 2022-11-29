import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default class FullPreviewImg extends Component {
  closeFullImg = () => {
    this.props.previewClick();
  };

  render() {
    const { imgUrl } = this.props;
    return (
      <div>
        {
          <Lightbox
            mainSrc={imgUrl && imgUrl}
            onCloseRequest={this.closeFullImg}
          />
        }
      </div>
    );
  }
}
