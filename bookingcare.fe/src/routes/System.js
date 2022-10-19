import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/admin/UserRedux';
import Header from '../containers/Header/Header';
import AdminUser from '../containers/System/AdminUser';
import DoctorManager from '../containers/System/admin/DoctorManager';
import { routeLinks } from '../connectSupplyFE/otherSupplies';

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    const { userManagerLink, userReduxLink, doctorManagerLink, userAdminLink } =
      routeLinks;
    return (
      <>
        {isLoggedIn && <Header />}

        <div className='system-container'>
          <div className='system-list'>
            <Switch>
              <Route path={userManagerLink} component={UserManage} />
              <Route path={userReduxLink} component={UserRedux} />
              <Route path={userAdminLink} component={AdminUser} />
              <Route path={doctorManagerLink} component={DoctorManager} />
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
