import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/admin/UserRedux';
import Header from '../containers/Header/Header';
import DoctorManager from '../containers/System/admin/DoctorManager';
import { routeLinks } from '../connectSupplyFE/otherSupplies';
import ScheduleManager from './../containers/System/doctorFiles/ScheduleManager';
import SpecialityManager from './../containers/System/speciality/SpecialityManager';
import ClinicManager from '../containers/System/clinics/ClinicManager';

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    const {
      userManagerLink,
      userReduxLink,
      doctorManagerLink,
      doctorScheduleManagerLink,
      specialityManagerLink,
      clinicManagerLink,
    } = routeLinks;

    //router quản lý cho admin
    return (
      <>
        {isLoggedIn && <Header />}
        <div className='system-container'>
          <div className='system-list'>
            <Switch>
              <Route path={userManagerLink} component={UserManage} />
              <Route path={userReduxLink} component={UserRedux} />
              <Route path={doctorManagerLink} component={DoctorManager} />
              <Route
                path={doctorScheduleManagerLink}
                component={ScheduleManager}
              />
              <Route
                path={specialityManagerLink}
                component={SpecialityManager}
              />
              <Route
                path={clinicManagerLink}
                component={ClinicManager} //v105xx2
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
