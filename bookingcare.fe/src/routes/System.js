import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/admin/UserRedux';
import Header from '../containers/Header/Header';
import AdminUser from '../containers/System/AdminUser';
import DoctorUser from '../containers/System/DoctorUser';
import { routeLinks } from '../connectSupplyFE/otherSupplies';

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    const { userManageLink, userReduxLink, userDoctorLink, userAdminLink } =
      routeLinks;
    return (
      <>
        {isLoggedIn && <Header />}

        <div className='system-container'>
          <div className='system-list'>
            <Switch>
              <Route path={userManageLink} component={UserManage} />
              <Route path={userReduxLink} component={UserRedux} />
              <Route path={userDoctorLink} component={DoctorUser} />
              <Route path={userAdminLink} component={AdminUser} />

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
