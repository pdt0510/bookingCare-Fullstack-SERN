import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLangsApp } from '../../../store/actions';

class HomeHeader extends Component {
  changeLangs = (lang) => {
    this.props.langsHandle(lang);
  };

  render() {
    const { language } = this.props;

    return (
      <>
        <div className='home-header-container'>
          <div className='home-header-content'>
            <div className='header-content-left'>
              <i className='fas fa-bars header-left-icon'></i>
              <span className='header-left-logo'></span>
            </div>
            <div className='header-content-mid'>
              <div className='header-mid-section'>
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.speciality' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.findingDoctor' />
                </span>
              </div>
              <div className='header-mid-section'>
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.healthFacilities' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.selectHospitalClinic' />
                </span>
              </div>
              <div className='header-mid-section'>
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.doctor' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.chooseAGoodDoctor' />
                </span>
              </div>
              <div className='header-mid-section'>
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.checkupPackage' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.generalHealthCheck' />
                </span>
              </div>
            </div>
            <div className='header-content-right'>
              <i className='fas fa-question-circle header-right-icon'></i>
              <span className='header-mid-text2'>
                <FormattedMessage id='home-header.support' />
              </span>
              <div className='switch-lang home-header-lang'>
                <span
                  className={`${language === LANGUAGES.VI ? 'active' : ''}`}
                  onClick={() => this.changeLangs(LANGUAGES.VI)}
                >
                  VI
                </span>
                <span>-</span>
                <span
                  className={`${language === LANGUAGES.EN ? 'active' : ''}`}
                  onClick={() => this.changeLangs(LANGUAGES.EN)}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>

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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    langsHandle: (lang) => dispatch(changeLangsApp(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
