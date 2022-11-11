import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './login.scss';

import { userService } from '../../services';

class Login extends Component {
  state = {
    email: '',
    message: '',
    password: '',
    isDisplayedPassword: false,
  };

  handleInput = (event) => {
    const { value, name, id } = event.target;
    if (id === 'isDisplayedPassword') {
      this.setState({
        [id]: !this.state.isDisplayedPassword,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = async () => {
    const { email, password } = this.state;
    const { userLoginSuccess } = this.props;

    try {
      const isLogged = await userService.loginApi(email, password);

      if (isLogged.errCode === 0) {
        userLoginSuccess(isLogged.user);

        this.setState({
          message: '',
        });
      } else {
        this.setState({
          message: isLogged.message,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            message: error.response.data.message,
          });
        }
      }
    }
  };

  renderEyes = (openEyes = true) => {
    if (openEyes) {
      return (
        <i
          className='fas fa-eye'
          id='isDisplayedPassword'
          onClick={this.handleInput}
        ></i>
      );
    }
    return (
      <i
        className='far fa-eye-slash'
        onClick={this.handleInput}
        id='isDisplayedPassword'
      ></i>
    );
  };

  //1h05ms28ss
  handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.handleSubmit();
    }
  };

  render() {
    const { isDisplayedPassword, email, password, message } = this.state;

    return (
      <>
        <div className='login-background'>
          <div className='login-container'>
            <div className='login-content row'>
              <div className='col-12 text-center text-login'>Login</div>
              <div className='col-12 form-group login-input'>
                <label htmlFor='nameHtmlFor'>Email</label>
                <input
                  type='text'
                  id='nameHtmlFor'
                  className='form-control login-input-outline'
                  placeholder='Enter your email'
                  name='email'
                  value={email}
                  onChange={this.handleInput}
                />
              </div>
              <div className='col-12 form-group login-input'>
                <label htmlFor='passwordHtmlFor' className='mt-24'>
                  Password
                </label>
                <span className='eye-password'>
                  <input
                    type={isDisplayedPassword ? 'text' : 'password'}
                    id='passwordHtmlFor'
                    className='form-control login-input-outline login-password'
                    placeholder='Enter your password'
                    name='password'
                    value={password}
                    onChange={this.handleInput}
                    onKeyDown={this.handleKeyDown} //1h05ms28ss
                  />
                  <a href='##' className='login-show-password'>
                    {isDisplayedPassword
                      ? this.renderEyes()
                      : this.renderEyes(false)}
                  </a>
                  <span className='col-12 mt-2 login-message'>
                    {message ? message : ''}
                  </span>
                </span>
              </div>
              <div className='col-12 text-center'>
                <a href='##' className='btn-login' onClick={this.handleSubmit}>
                  Log in
                </a>
                <a href='##' className='forgot_password mt-3'>
                  Forgot your password ?
                </a>
              </div>

              <div className='col-12 text-center text-other-login'>
                <span>Login with</span>
              </div>

              <div className='col-12 text-center social-login'>
                <a href='##' className='login-icon-design login-icon-facebook'>
                  <i className='fab fa-facebook-f'></i>
                </a>

                <a href='##' className='login-icon-design login-icon-google'>
                  <i className='fab fa-google-plus-g'></i>
                </a>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),

    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
