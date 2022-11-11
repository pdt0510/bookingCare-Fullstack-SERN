import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import { routeLinks } from '../connectSupplyFE/otherSupplies';
import ScheduleManager from '../containers/System/doctorFiles/ScheduleManager';

//src22, 26ms53ss
class DoctorRoutes extends Component {
  render() {
    const { isLoggedIn } = this.props;
    const { doctorScheduleManagerLink } = routeLinks;

    return (
      <>
        {isLoggedIn && <Header />}
        <div className='Doctor-container'>
          <div className='Doctor-list'>
            <Switch>
              <Route
                path={doctorScheduleManagerLink} //3ms06ss, 32ms28ss
                component={ScheduleManager}
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
