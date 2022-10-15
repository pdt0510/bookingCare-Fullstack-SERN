import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import './Header.scss';
import { adminMenu } from './menuApp';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
  changeLangs = (lang) => {
    this.props.langsHandle(lang);
  };

  render() {
    const { processLogout, isLoggedIn, language, userInfo } = this.props;

    return (
      <div className='header-container'>
        <div className='header-tabs-container'>
          {isLoggedIn ? <Navigator menus={adminMenu} /> : ''}
        </div>

        <div className='switch-lang header-lang'>
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

        <span>
          <FormattedMessage id={'home-header.welcome'} />
          {userInfo ? userInfo.firstName : 'No user'}
        </span>

        <div className='btn btn-logout' onClick={processLogout}>
          <i className='fas fa-sign-out-alt'></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    langsHandle: (lang) => dispatch(actions.changeLangsApp(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
