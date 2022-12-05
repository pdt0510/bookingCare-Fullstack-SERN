import React, { Component, Fragment } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../hoc/authentication';
import { path } from '../utils';
import Home from '../routes/Home';
import System from '../routes/System';
import Login from './auth/Login';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './homePage/HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import DoctorDetail from './patients/doctors/DoctorDetail';
import DoctorRoutes from './../routes/DoctorRoutes';
import VerifyEmail from './patients/VerifyEmail';
import DetailSpeciality from './patients/speciality/DetailSpeciality';
import ClinicDetail from './patients/clinics/ClinicDetail';

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    const {
      idParam,
      HOME,
      LOGIN,
      SYSTEM,
      HOMEPAGE,
      DOCTOR_DETAIL_PAGE,
      DOCTOR,
      VERIFY_EMAIL_BOOKING,
      DETAIL_SPECIALITY_PAGE,
      DETAIL_CLINIC_PAGE,
    } = path;

    //router quản lý tất cả (admin, users (doctor, admin, patient...vv))
    return (
      <Fragment>
        <Router history={history}>
          <div className='main-container'>
            <ConfirmModal />
            <div className='content-container'>
              <CustomScrollbars>
                <Switch>
                  <Route exact path={HOME} component={Home} />
                  <Route
                    path={LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path={HOMEPAGE} component={HomePage} />
                  <Route
                    path={DOCTOR_DETAIL_PAGE + idParam}
                    component={DoctorDetail}
                  />
                  <Route
                    path={DOCTOR} //v107xx1
                    component={userIsAuthenticated(DoctorRoutes)}
                  />
                  <Route path={VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                  <Route
                    path={DETAIL_SPECIALITY_PAGE + idParam}
                    component={DetailSpeciality}
                  />
                  {/* 20ms45ss */}
                  <Route
                    path={DETAIL_CLINIC_PAGE + idParam}
                    component={ClinicDetail}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position='top-right'
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
