import React, { Component } from 'react';
import './HomeHeaderBanner.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

//src21, 29ms22ss
class HomeHeaderBanner extends Component {
  render() {
    return (
      <div className='home-header-banner'>
        <div className='header-banner-content'>
          <span className='header-banner-text'>
            <FormattedMessage id='bannerTitle.title1_1' /> <br />
            <span>
              <FormattedMessage id='bannerTitle.title1_2' />
            </span>
          </span>
          <div className='header-banner-search'>
            <i className='fas fa-search banner-search-icon'></i>
            <input className='banner-search-input' placeholder={''} />
          </div>
          <div className='header-banner-badge'>
            <span className='banner-badge-google'></span>
            <span className='banner-badge-appStore'></span>
          </div>
        </div>
        <div className='banner-homeFooter-content'>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-1'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title3_1' /> <br />
              <FormattedMessage id='bannerTitle.title3_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-2'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title4_1' /> <br />
              <FormattedMessage id='bannerTitle.title4_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-3'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title5_1' /> <br />
              <FormattedMessage id='bannerTitle.title5_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-4'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title6_1' /> <br />
              <FormattedMessage id='bannerTitle.title6_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-5'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title7_1' /> <br />
              <FormattedMessage id='bannerTitle.title7_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-6'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title8_1' /> <br />
              <FormattedMessage id='bannerTitle.title8_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-7'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title9_1' /> <br />
              <FormattedMessage id='bannerTitle.title9_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-8'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title10_1' /> <br />
              <FormattedMessage id='bannerTitle.title10_2' />
            </span>
          </div>
          <div className='homeFooter-content-blocks'>
            <span className='content-blocks-outlined content-icon-bgr-9'></span>
            <span className='content-block-text'>
              <FormattedMessage id='bannerTitle.title11_1' /> <br />
              <FormattedMessage id='bannerTitle.title11_2' />
            </span>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderBanner);
