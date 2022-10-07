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
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import FullPreviewImg from '../FullPreviewImg';
import TableManagerUser from './TableManagerUser';
import 'react-toastify/dist/ReactToastify.css';

// src18
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
      reduxRoles.length > 0 &&
      this.state.password !== '***'
    ) {
      this.defaultValues();
    }
  };

  editUserHandle = (item) => {
    const { createdAt, updatedAt, avatar, ...userEdited } = item;
    let convertTobase64Str = '';

    if (typeof avatar === 'string') {
      //base64 is available in reudx
      this.props.savingImgUrl(avatar);
    } else {
      //from real db, converting Buffer to base64 of avatar , 45ms05ss
      convertTobase64Str = new Buffer.from(avatar).toString('binary');
      this.props.savingImgUrl(convertTobase64Str);
    }

    this.setState({
      ...userEdited,
      password: '***',
      passwordConfirmed: '***',
      avatar: convertTobase64Str ? convertTobase64Str : avatar,
    });
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

  handleAvatarUploaded = async (e) => {
    const file = e.target.files[0];
    if (file) {
      let fileToBase64 = await CommonUtils.getBase64(file); //23ms47ss
      const fileToImgUrl = URL.createObjectURL(file);

      if (fileToImgUrl) {
        this.props.savingImgUrl(fileToImgUrl);
        this.setState({
          avatar: fileToBase64, //28ms14ss
          // avatar: file,
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
      } else if (key === 'id') {
        continue; //v71xx2
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
    let data = null;
    const { isFullPreview, ...userInfoChecked } = this.state;

    const isValid = this.checkingInputValues(userInfoChecked);
    if (isValid) {
      const {
        createUserInfo,
        userListRedux,
        updateUserListRedux,
        updateAnUser,
      } = this.props;

      const { password, passwordConfirmed, ...userUpdated } = userInfoChecked; //28ms14ss

      if (password === '***' && passwordConfirmed === '***') {
        data = await updateAnUser(userUpdated);
        if (data.errCode === 0) {
          this.resettingForm();
        }
      } else {
        const { id, ...userCreated } = userInfoChecked; //28ms14ss, v71xx2
        data = await createUserInfo(userCreated);
        if (data.errCode === 0) {
          const newList = [data.user, ...userListRedux];
          updateUserListRedux(newList);
          this.resettingForm();
        }
      }
    }
  };

  resettingForm = () => {
    this.props.removingImgUrl();

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

  renderImgUrl = (imgUrl) => {
    return (
      <span
        className='preview-image'
        style={{ backgroundImage: `url(${imgUrl})` }}
        onClick={this.previewClick}
      ></span>
    );
  };

  renderPreviewImg = (imgUrl) => {
    return <FullPreviewImg imgUrl={imgUrl} previewClick={this.previewClick} />;
  };

  render() {
    const { reduxGenders, reduxRoles, reduxPositions, isLoading, imgUrl } =
      this.props;

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
      avatarL,
      passwordL,
      passwordConfirmedL,
      firstnameL,
      lastnameL,
      addressL,
      mobileL,
      genderL,
      roleL,
      positionL,
      createL,
      saveL,
      cancelL,
      loadImgL,
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
                    disabled={password === '***' ? true : false}
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
                    disabled={password === '***' ? true : false}
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
                    disabled={passwordConfirmed === '***' ? true : false}
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
                    <FormattedMessage id={avatarL} />
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
                    <FormattedMessage id={loadImgL} />
                  </Label>
                  {
                    imgUrl && this.renderImgUrl(imgUrl) // 45ms05ss
                  }

                  {isFullPreview && imgUrl && this.renderPreviewImg(imgUrl)}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter className='userRedux-footer'>
          <Button
            color='danger'
            onClick={this.resettingForm}
            className='userRedux-btn'
          >
            <FormattedMessage id={cancelL} />
          </Button>
          <Button
            color={password === '***' ? 'success' : 'primary'}
            onClick={this.submitReduxForm}
            className='userRedux-btn'
          >
            {password === '***' ? (
              <FormattedMessage id={saveL} />
            ) : (
              <FormattedMessage id={createL} />
            )}
          </Button>
        </ModalFooter>
        <TableManagerUser editUserHandle={this.editUserHandle} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userListRedux: state.admin.userList,
    imgUrl: state.app.imgUrl,
    isLoading: state.admin.isLoading,
    reduxGenders: state.admin.genderList,
    reduxRoles: state.admin.roleList,
    reduxPositions: state.admin.posList,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAnUser: (newData) => dispatch(actions.updateAnUser(newData)),
    updateUserListRedux: (userinfo) =>
      dispatch(actions.updateUserListRedux(userinfo)),
    createUserInfo: (userinfo) => dispatch(actions.createUserInfo(userinfo)),
    savingImgUrl: (imgUrl) => dispatch(actions.savingImgUrl(imgUrl)),
    removingImgUrl: () => dispatch(actions.removingImgUrl()),
    isFetching: () => dispatch(actions.isLoadingFromFetch()),
    loadingAllcodeAttrs: () => dispatch(actions.fetchAttrsOfAllcodeApi()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
