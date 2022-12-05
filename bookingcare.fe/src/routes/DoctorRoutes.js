import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import { routeLinks } from '../connectSupplyFE/otherSupplies';
import ScheduleManager from '../containers/System/doctorFiles/ScheduleManager';
import PatientManager from '../containers/System/doctorFiles/PatientManager';

class DoctorRoutes extends Component {
  render() {
    const { isLoggedIn } = this.props;
    const { doctorScheduleManagerLink, doctorPatientManagerLink } = routeLinks;

    // v107xx1
    return (
      <>
        {isLoggedIn && <Header />}
        <div className='Doctor-container'>
          <div className='doctor-list'>
            <Switch>
              <Route
                path={doctorScheduleManagerLink}
                component={ScheduleManager}
              />
              <Route
                path={doctorPatientManagerLink}
                component={PatientManager}
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRoutes);
