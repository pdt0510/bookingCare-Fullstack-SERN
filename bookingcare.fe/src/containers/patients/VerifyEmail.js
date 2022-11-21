import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyEmail.scss';
import * as actions from '../../store/actions';
import HomeHeader from '../homePage/section/HomeHeader';

//src26, 7ms03ss
class VerifyEmail extends Component {
  state = {
    message: null,
  };

  renderRedirectLink = () => {
    //route of App.js is passed to here for get 'match'
    //values lấy từ 'params' of url string, v98xx2
    const { idDoctor, token } = this.props.match.params;

    if (idDoctor && token) {
      const info = { doctorId: idDoctor, token };
      return (
        <h4>
          Click{' '}
          <a href='##' onClick={() => this.confirmHandle(info)}>
            here
          </a>{' '}
          to confirm your appointment
        </h4>
      );
    }
  };

  confirmHandle = async (info) => {
    const data = await this.props.verifyEmailFn(info); //10ms21ss
    this.setState({
      message:
        data.errCode === 0
          ? 'Your booking is successfully actived'
          : data.message,
    });
  };

  render() {
    const { message } = this.state;
    return (
      <div className='email-verify container'>
        <HomeHeader />
        <p>
          <h2>Verification email</h2>
          {message === null ? this.renderRedirectLink() : <h4>{message}</h4>}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmailFn: (info) => dispatch(actions.verifyEmailFn(info)), //10ms21ss
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
