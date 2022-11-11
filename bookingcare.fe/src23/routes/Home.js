import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { routeLinks } from '../connectSupplyFE/otherSupplies';

class Home extends Component {
  render() {
    const { homeLink, userManagerLink } = routeLinks;
    const { isLoggedIn } = this.props;
    const linkToRedirect = isLoggedIn ? userManagerLink : homeLink;
    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
