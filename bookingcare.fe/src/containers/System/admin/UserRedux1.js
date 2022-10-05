import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { FormattedMessage } from 'react-intl';
import {
  Button,
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
import { textLangs } from '../../../connectSupplyFE/otherSupplies';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import FullPreviewImg from '../FullPreviewImg';
import TableManagerUser from './TableManagerUser';
import 'react-toastify/dist/ReactToastify.css';

//src17, UserRedux1.js
class UserRedux extends Component {
  state = {
    email: '',
    address: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmed: '',
    gender: '',
    position: '',
    roleId: '',
    phoneNumber: '',
    avatar: '',
    isFullPreview: false,
  };

  componentDidMount = async () => {
    const {
      reduxGenders,
      reduxRoles,
      reduxPositions,
      isFetching,
      loadingAllcodeAttrs,
    } = this.props;

    if (
      reduxGenders.length === 0 ||
      reduxRoles.length === 0 ||
      reduxPositions.length === 0
    ) {
      isFetching();
      setTimeout(async () => {
        await loadingAllcodeAttrs();
      }, 2000);
    }
  };

  // 47ms21ss
  componentDidUpdate = (prevProps, prevState) => {
    const { reduxGenders, reduxPositions, reduxRoles, language } = this.props;

    if (
      prevProps.reduxGenders !== reduxGenders ||
      prevProps.reduxPositions !== reduxPositions ||
      prevProps.reduxRoles !== reduxRoles
    ) {
      this.defaultValues();
    } else if (
      prevProps.language !== language &&
      reduxGenders.length > 0 &&
      reduxPositions.length > 0 &&
      reduxRoles.length > 0
    ) {
      this.defaultValues();
    }
  };

  defaultValues = () => {
    const { reduxGenders, reduxPositions, reduxRoles, language } = this.props;

    this.setState({
      gender:
        reduxGenders.length > 0 && language === LANGUAGES.EN
          ? reduxGenders[0].keymap
          : reduxGenders[0].keymap,
      position:
        reduxPositions.length > 0 && language === LANGUAGES.EN
          ? reduxPositions[0].keymap
          : reduxPositions[0].keymap,
      roleId:
        reduxRoles.length > 0 && language === LANGUAGES.EN
          ? reduxRoles[0].keymap
          : reduxRoles[0].keymap,
    });
  };

  handleAvatarUploaded = (e) => {
    const { savingPreviewUrl } = this.props;
    let { files } = e.target;

    if (files.length > 0) {
      let file = files[0];
      const prevImgUrl = URL.createObjectURL(file);

      if (prevImgUrl) {
        savingPreviewUrl(prevImgUrl);
        this.setState({
          avatar: file,
        });
      }

      e.target.value = null;
    }
  };

  previewClick = () => {
    this.setState({ isFullPreview: !this.state.isFullPreview });
  };

  onchangeHandle = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkingInputValues = (state) => {
    let isValid = false;
    let password, passwordConfirm;

    for (let key in state) {
      if (key === 'password') {
        password = state[key];
      } else if (key === 'passwordConfirmed') {
        passwordConfirm = state[key];
      }

      if (!state[key]) {
        if (key === 'passwordConfirmed') {
          alert(`Missing param: CONFIRM PASSWORD`);
        } else if (key === 'phoneNumber') {
          alert(`Missing field: PHONE NUMBER`);
        } else if (key === 'roleId') {
          alert(`Missing param: ROLE`);
        }
        alert(`Error param: ${key.toUpperCase()}`);
        return isValid;
      }
    }

    if (password !== passwordConfirm) {
      alert(`Password fields're incorrect`);
      return isValid;
    }

    return (isValid = true);
  };

  submitReduxForm = async () => {
    const { isFullPreview, ...checkingUserInfo } = this.state;

    const isValid = this.checkingInputValues(checkingUserInfo);
    if (isValid) {
      const { createUserInfo, userListRedux, updateUserListRedux } = this.props;

      const newUser = await createUserInfo(checkingUserInfo);
      if (newUser.errCode === 0) {
        // const newList = [...userListRedux, newUser.user];
        const newList = [newUser.user, ...userListRedux]; //48ms27ss
        updateUserListRedux(newList); //32ms12ss
        this.resettingForm(); //44ms17ss
      }
    }
  };

  resettingForm = () => {
    const { removingPreviewUrl } = this.props;
    removingPreviewUrl();

    const { isFullPreview, ...restState } = this.state;
    for (const key in restState) {
      restState[key] = '';
    }

    this.setState({
      ...restState,
    });

    this.defaultValues();
  };

  renderOptionEle = (dataArr) => {
    if (dataArr && dataArr.length > 0) {
      const { language } = this.props;
      return (
        <>
          <option value=''>
            {language === LANGUAGES.EN ? 'Select' : 'Lựa chọn'} ---
          </option>

          {dataArr.map((item) => {
            return (
              <option value={item.keymap} key={item.keymap}>
                {language === LANGUAGES.EN ? item.valueEN : item.valueVI}
              </option>
            );
          })}
        </>
      );
    }
  };

  render() {
    const {
      userEdit,
      reduxGenders,
      reduxRoles,
      reduxPositions,
      isLoading,
      previewImgUrl,
    } = this.props;

    const {
      email,
      address,
      firstName,
      lastName,
      password,
      passwordConfirmed,
      gender,
      roleId,
      position,
      phoneNumber,
      isFullPreview,
    } = this.state;

    const {
      createNewUserL,
      emailL,
      imageL,
      passwordL,
      passwordConfirmedL,
      firstnameL,
      lastnameL,
      addressL,
      mobileL,
      genderL,
      roleL,
      positionL,
      saveL,
      loadImg,
    } = textLangs;

    return (
      <div className='container col-10'>
        <ModalHeader className='userRedux-header'>
          <FormattedMessage id={createNewUserL} />
        </ModalHeader>
        <ModalBody className='userRedux-body'>
          <h3>{isLoading ? 'Loading database' : ''}</h3>
          <Form>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='EmailFor'>
                    <FormattedMessage id={emailL} />
                  </Label>
                  <Input
                    type='email'
                    name='email'
                    disabled={userEdit ? true : false}
                    value={email}
                    id='EmailFor'
                    onChange={this.onchangeHandle}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='addressFor'>
                    <FormattedMessage id={addressL} />
                  </Label>
                  <Input
                    type='text'
                    name='address'
                    value={address}
                    id='addressFor'
                    onChange={this.onchangeHandle}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label' for='firstNameFor'>
                    <FormattedMessage id={firstnameL} />
                  </Label>
                  <Input
                    type='text'
                    name='firstName'
                    value={firstName}
                    id='firstNameFor'
                    onChange={this.onchangeHandle}
                  />
                </FormGroup>
              </Col>
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label' for='LastnameFor'>
                    <FormattedMessage id={lastnameL} />
                  </Label>
                  <Input
                    type='text'
                    name='lastName'
                    value={lastName}
                    id='LastnameFor'
                    onChange={this.onchangeHandle}
                  />
                </FormGroup>
              </Col>
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label' for='PasswordFor'>
                    <FormattedMessage id={passwordL} />
                  </Label>
                  <Input
                    type='text'
                    name='password'
                    disabled={userEdit ? true : false}
                    value={password}
                    id='PasswordFor'
                    onChange={this.onchangeHandle}
                  />
                </FormGroup>
              </Col>
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label' for='passwordConfirmedFor'>
                    <FormattedMessage id={passwordConfirmedL} />
                  </Label>
                  <Input
                    type='text'
                    name='passwordConfirmed'
                    disabled={userEdit ? true : false}
                    value={passwordConfirmed}
                    id='passwordConfirmedFor'
                    onChange={this.onchangeHandle}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='2'>
                <FormGroup>
                  <Label className='userRedux-label' for='exampleSelect'>
                    <FormattedMessage id={genderL} />
                  </Label>
                  <Input
                    type='select'
                    name='gender'
                    value={gender}
                    id='exampleSelect'
                    onChange={this.onchangeHandle}
                  >
                    {this.renderOptionEle(reduxGenders)}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='2'>
                <FormGroup>
                  <Label className='userRedux-label' for='exampleSelect'>
                    <FormattedMessage id={positionL} />
                  </Label>
                  <Input
                    type='select'
                    name='position'
                    value={position}
                    id='exampleSelect'
                    onChange={this.onchangeHandle}
                  >
                    {this.renderOptionEle(reduxPositions)}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='2'>
                <FormGroup>
                  <Label className='userRedux-label' for='roleFor'>
                    <FormattedMessage id={roleL} />
                  </Label>
                  <Input
                    type='select'
                    name='roleId'
                    value={roleId}
                    id='roleFor'
                    onChange={this.onchangeHandle}
                  >
                    {this.renderOptionEle(reduxRoles)}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label' for='phoneNumberFor'>
                    <FormattedMessage id={mobileL} />
                  </Label>
                  <Input
                    type='number'
                    name='phoneNumber'
                    value={phoneNumber}
                    id='phoneNumberFor'
                    onChange={this.onchangeHandle}
                  />
                </FormGroup>
              </Col>
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label'>
                    <FormattedMessage id={imageL} />
                  </Label>
                  <Input
                    ref='file'
                    type='file'
                    name='avatar'
                    id='avatarFor'
                    hidden
                    onChange={this.handleAvatarUploaded}
                  />
                  <Label className='userRedux-label-upload' for='avatarFor'>
                    <i className='fas fa-upload'></i>
                    <FormattedMessage id={loadImg} />
                  </Label>
                  {previewImgUrl && (
                    <span
                      className='preview-image'
                      style={{ backgroundImage: `url(${previewImgUrl})` }}
                      onClick={this.previewClick}
                    ></span>
                  )}

                  {isFullPreview && (
                    <FullPreviewImg
                      imgUrl={previewImgUrl}
                      previewClick={this.previewClick}
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter className='userRedux-footer'>
          <Button
            color='primary'
            onClick={this.submitReduxForm}
            className='userRedux-btn'
          >
            <FormattedMessage id={saveL} />
          </Button>
        </ModalFooter>

        {/* 4ms19ss */}
        <TableManagerUser />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userListRedux: state.admin.userList,
    previewImgUrl: state.app.previewImgUrl,
    isLoading: state.admin.isLoading,
    reduxGenders: state.admin.genderList,
    reduxRoles: state.admin.roleList,
    reduxPositions: state.admin.posList,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserListRedux: (userinfo) =>
      dispatch(actions.updateUserListRedux(userinfo)), //32ms12ss
    createUserInfo: (userinfo) => dispatch(actions.createUserInfo(userinfo)),
    savingPreviewUrl: (previewUrl) =>
      dispatch(actions.savingPreviewUrl(previewUrl)),
    removingPreviewUrl: () => dispatch(actions.removingPreviewUrl()),
    isFetching: () => dispatch(actions.isLoadingFromFetch()),
    loadingAllcodeAttrs: () => dispatch(actions.fetchAttrsOfAllcodeApi()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
