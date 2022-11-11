import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminUser extends Component {
  state = {};

  componentDidMount() {}
  render() {
    return (
      <div className='text-center'>
        <h1>AdminUser</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
