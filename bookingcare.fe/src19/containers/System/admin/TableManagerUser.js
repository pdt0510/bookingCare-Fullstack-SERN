import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { FormattedMessage } from 'react-intl';
import { userManageLangs } from '../../../connectSupplyFE/otherSupplies';
import * as actions from '../../../store/actions';

class TableManagerUser extends Component {
  componentDidMount = () => {
    const { userListRedux, fetchUserList } = this.props;
    if (userListRedux.length === 0) {
      setTimeout(async () => {
        await fetchUserList();
      }, 2000);
    }
  };

  deleleUserRedux = async (userId) => {
    const isDel = window.confirm('you want to delete ?');

    if (userId && isDel) {
      try {
        await this.props.delAnUser(userId);
      } catch (error) {
        console.log('TableManagerUser.js: ', error);
      }
    }
  };

  renderUserList = (arrData) => {
    return arrData.map((item, idx) => (
      <tbody key={idx}>
        <tr>
          <th scope='row'>{idx + 1}</th>
          <td>{item.email}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.address}</td>
          <td className='btn-group-user'>
            <a
              href='##'
              role='button'
              className='btn-user-list btn-edit'
              onClick={() => this.props.editUserHandle(item)}
            >
              <i className='fas fa-pencil-alt'></i>
            </a>
            <a
              href='##'
              type='button'
              className='btn-user-list btn-delete'
              onClick={() => this.deleleUserRedux(item.id)}
            >
              <i className='fas fa-trash delete-icon'></i>
            </a>
          </td>
        </tr>
      </tbody>
    ));
  };

  render() {
    const { userListRedux } = this.props;
    const { emailL, firstnameL, lastnameL, addressL, sttL } = userManageLangs;

    return (
      <div className='text-center mt-3'>
        <table className='table table-hover table-bordered table-sm '>
          <thead className='table-success'>
            <tr>
              <th scope='col'>
                <FormattedMessage id={sttL} />
              </th>
              <th scope='col'>
                <FormattedMessage id={emailL} />
              </th>
              <th scope='col'>
                <FormattedMessage id={firstnameL} />
              </th>
              <th scope='col'>
                <FormattedMessage id={lastnameL} />
              </th>
              <th scope='col'>
                <FormattedMessage id={addressL} />
              </th>
              <th scope='col'></th>
            </tr>
          </thead>
          {userListRedux.length > 0 && this.renderUserList(userListRedux)}
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userListRedux: state.admin.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserListRedux: (userinfo) =>
      dispatch(actions.updateUserListRedux(userinfo)),
    delAnUser: (id) => dispatch(actions.delAnUser(id)),
    fetchUserList: (userinfo) => dispatch(actions.fetchUserList(userinfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
