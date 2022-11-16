import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLangsApp } from '../../../store/actions';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { routeLinks } from '../../../connectSupplyFE/otherSupplies';

class HomeHeader extends Component {
  changeLangs = (lang) => {
    this.props.langsHandle(lang);
  };

  goHomepage = () => {
    const { homeLink } = routeLinks;
    const { history } = this.props;
    history.push(homeLink);
  };

  render() {
    const { language } = this.props;

    return (
      <div className='home-header-content'>
        <div className='header-content-left' onClick={this.goHomepage}>
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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(HomeHeader);
