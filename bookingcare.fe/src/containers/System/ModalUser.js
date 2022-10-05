import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  Form,
  Row,
  Col,
} from 'reactstrap';

import './ModalUser.scss';

class ModalUser extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmed: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    gender: '',
    roleId: '',
  };

  componentDidMount = () => {
    const { userEdit } = this.props;
    if (userEdit) {
      this.setState({
        ...userEdit,
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkingEditValues = (state) => {
    let isValid = false;
    for (let key in state) {
      if (!state[key]) {
        if (key === 'id') {
          continue;
        } else if (key === 'phoneNumber') {
          alert(`Missing field: PHONE NUMBER`);
        } else if (key === 'roleId') {
          alert(`Missing param: ROLE`);
        } else {
          alert(`Missing param: ${key.toUpperCase()}`);
        }
        return isValid;
      }
    }
    return (isValid = true);
  };

  checkingInputValues = (state) => {
    let isValid = false;
    for (let key in state) {
      if (!state[key]) {
        if (key === 'passwordConfirmed') {
          alert(`Missing param: CONFIRM PASSWORD`);
        } else if (key === 'phoneNumber') {
          alert(`Missing field: PHONE NUMBER`);
        } else if (key === 'roleId') {
          alert(`Missing param: ROLE`);
        } else {
          alert(`Missing param: ${key.toUpperCase()}`);
        }
        return isValid;
      }
    }
    return (isValid = true);
  };

  resettingForm = () => {
    const stateCloned = { ...this.state };
    for (let key in stateCloned) {
      stateCloned[key] = '';
    }
    this.setState({
      ...stateCloned,
    });
  };

  submitHandle = async () => {
    const { createNewUserFn, updateAnUser, userEdit } = this.props;
    const {
      id,
      email,
      firstName,
      lastName,
      address,
      gender,
      phoneNumber,
      roleId,
    } = this.state;

    let isValid = null;
    let isSuccess = null;

    if (userEdit) {
      const dataForUpdate = {
        id,
        email,
        firstName,
        lastName,
        address,
        gender,
        phoneNumber,
        roleId,
      };
      isValid = this.checkingEditValues(dataForUpdate);
      if (isValid) {
        isSuccess = await updateAnUser(dataForUpdate);
      }
    } else {
      isValid = this.checkingInputValues(this.state);
      if (isValid) {
        isSuccess = await createNewUserFn(this.state);
      }
    }

    if (isSuccess) {
      this.cancelHandle();
    }
  };

  cancelHandle = () => {
    this.resettingForm();
    this.props.toggleModalFn();
  };

  render() {
    const { toggleModalFn, userEdit } = this.props;
    const {
      email,
      password,
      passwordConfirmed,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      roleId,
    } = this.state;

    return (
      <Modal
        isOpen={true}
        centered
        size='lg'
        className='model-user-container-custom'
      >
        <ModalHeader toggle={toggleModalFn} className='header-custom'>
          {userEdit ? 'Update an user' : 'Create an new user'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col className='mb-3'>
                <FormGroup>
                  <Label for='EmailFor'>Email</Label>
                  <Input
                    type='email'
                    name='email'
                    disabled={userEdit ? true : false}
                    value={email}
                    id='EmailFor'
                    placeholder='Email'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='PasswordFor'>Password</Label>
                  <Input
                    type='text'
                    name='password'
                    disabled={userEdit ? true : false}
                    value={password ? password : '***'}
                    id='PasswordFor'
                    placeholder='Password'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='passwordConfirmedFor'>Confirm Password</Label>
                  <Input
                    type='text'
                    name='passwordConfirmed'
                    disabled={userEdit ? true : false}
                    value={passwordConfirmed ? passwordConfirmed : '***'}
                    id='passwordConfirmedFor'
                    placeholder='Confirm password'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='firstNameFor'>Firstname</Label>
                  <Input
                    type='text'
                    name='firstName'
                    value={firstName}
                    id='firstNameFor'
                    placeholder='Firstname'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='LastnameFor'>Lastname</Label>
                  <Input
                    type='text'
                    name='lastName'
                    value={lastName}
                    id='LastnameFor'
                    placeholder='Lastname'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className='mb-3'>
                <FormGroup>
                  <Label for='addressFor'>Address</Label>
                  <Input
                    type='text'
                    name='address'
                    value={address}
                    id='addressFor'
                    placeholder='Address'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='4' className='mb-3'>
                <FormGroup>
                  <Label for='phoneNumberFor'>Phone number</Label>
                  <Input
                    type='number'
                    name='phoneNumber'
                    value={phoneNumber}
                    id='phoneNumberFor'
                    placeholder='Phone number'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='4' className='mb-3'>
                <FormGroup>
                  <Label for='exampleSelect'>Gender</Label>
                  <Input
                    type='select'
                    name='gender'
                    value={gender}
                    id='exampleSelect'
                    onChange={this.handleChange}
                  >
                    <option value=''>Select ---</option>
                    <option value='F'>Female</option>
                    <option value='M'>Male</option>
                    <option value='O'>Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='4' className='mb-3'>
                <FormGroup>
                  <Label for='roleFor'>Role</Label>
                  <Input
                    type='select'
                    name='roleId'
                    value={roleId}
                    id='roleFor'
                    onChange={this.handleChange}
                  >
                    <option value=''>Select ---</option>
                    <option value='0'>Admin</option>
                    <option value='1'>Doctor</option>
                    <option value='2'>Patient</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={this.submitHandle}
            className='modalFooter-btn-group'
          >
            {userEdit ? 'Update' : 'Add new'}
          </Button>
          <Button
            color='secondary'
            onClick={this.cancelHandle}
            className='modalFooter-btn-group'
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
