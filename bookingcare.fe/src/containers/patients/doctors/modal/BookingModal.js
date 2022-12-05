import React, { Component } from 'react';
import './BookingModal.scss';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
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
import 'bootstrap/dist/css/bootstrap.css';
import { LANGUAGES } from '../../../../utils';
import CommonUtils from './../../../../utils/CommonUtils';
import DoctorIntro from './../DoctorIntro';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerCustom from '../../../System/doctorFiles/DatePickerCustom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { bookingModalLangs } from '../../../../connectSupplyFE/otherSupplies';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';

class BookingModal extends Component {
  state = {
    form: {
      fullname: '',
      phoneNumber: '0948888888',
      email: 'tintuc271@gmail.com',
      address: 'address 123',
      reason: 'reason 123',
      birthday: new Date(),
      gender: '',
    },
    doctorPriceVI: '',
    doctorPriceUSD: '',
    introBookingInfo: '',
  };

  componentDidMount = async () => {
    if (this.props.doctorId) {
      const {
        fetchDoctorInfoAllcodeFn,
        getDoctorExtraInfoFn,
        fetchUserAllcodeFn,
        modalData,
        doctorId,
      } = this.props;

      await fetchUserAllcodeFn();
      await fetchDoctorInfoAllcodeFn();
      const doctorExtra = await getDoctorExtraInfoFn(doctorId);

      if (doctorExtra) {
        const { priceList } = this.props;
        const { priceId } = doctorExtra.data;
        const { date, timeTypeData } = modalData;

        const doctorPrice = CommonUtils.formatCurrency(priceId, priceList);
        if (doctorPrice) {
          const introBookingInfo = {
            price: this.getPrice(
              doctorPrice.viCurrency,
              doctorPrice.dollarCurrency,
            ),
            schedule: this.getSchedule(timeTypeData),
            date: this.getDateConverted(date),
          };

          const defaultForm = {
            birthday: new Date(),
            gender: this.getInitialGender(),
          };

          this.setState({
            form: {
              ...this.state.form,
              ...defaultForm,
            },
            doctorPriceVI: doctorPrice.viCurrency,
            doctorPriceUSD: doctorPrice.dollarCurrency,
            introBookingInfo,
          });
        }
      }
    }
  };

  getInitialGender = () => {
    const { genderList, language } = this.props;
    return language === LANGUAGES.EN
      ? genderList[0].keymap
      : genderList[0].keymap;
  };

  formOnchange = (event) => {
    const { name, value } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  checkingInputValues = (state) => {
    for (let key in state) {
      if (!state[key]) {
        alert(`Missing param: ${key.toUpperCase()}`);
        return false;
      }
    }
    return true;
  };

  resettingForm = () => {
    const stateCloned = { ...this.state };

    for (let key in stateCloned) {
      if (key !== 'doctorId') {
        stateCloned[key] = '';
      }
    }

    this.setState({
      ...stateCloned,
    });
  };

  getPrice = (doctorPriceVI, doctorPriceUSD) => {
    const { language } = this.props;
    return language === LANGUAGES.EN
      ? ` ${doctorPriceUSD}$`
      : ` ${doctorPriceVI}đ`;
  };

  getSchedule = (timeTypeData) => {
    const { language } = this.props;
    return language === LANGUAGES.EN
      ? ` ${timeTypeData.valueEN}`
      : ` ${timeTypeData.valueVI}`;
  };

  getDateConverted = (timestamp) => {
    const formattedDate = CommonUtils.convertTimestampTo_DMYstr(timestamp); //v108xx6
    return ` ${formattedDate}`;
  };

  getDatePicker = (date) => {
    this.setState({
      form: {
        ...this.state.form,
        birthday: date,
      },
    });
  };

  renderGenderList = () => {
    const { genderList, language } = this.props;
    if (genderList && genderList.length > 0) {
      return genderList.map((item, idx) => {
        return (
          <option key={idx} value={item.keymap}>
            {language === LANGUAGES.EN ? item.valueEN : item.valueVI}
          </option>
        );
      });
    }
  };

  renderMessageL = (mesL) => {
    return this.props.intl.formatMessage({ id: mesL });
  };

  renderEmailContent = (token) => {
    const { language, doctorId } = this.props;
    const { form, introBookingInfo } = this.state;
    const { price, schedule, date } = introBookingInfo;
    let emailStr = null;

    const redirectLink = `${process.env.REACT_APP_REDIRECT_URL}/verify-booking/token=${token}/doctorId=${doctorId}`;

    if (language === LANGUAGES.EN) {
      emailStr = `You received this email because you booked an online medical appointment on the Bookingcare.vn website.
      <h3>Hello there! ${form.fullname}.</h3>
      <h3>Medical examination time: ${schedule}, ${date}</h3>
      <h3>Price: ${price}</h3>
      If the above information is true, please click on the link below to confirm and complete the medical appointment, thank you.
      <h3>
        <a href=${redirectLink} target='_blank'>Click here</a>
      </h3>`;
    } else {
      emailStr = `
      Bạn nhân được email này vì đã đặt lịch khám bệnh online trên Bookingcare.vn website.
      <h3>Xin chào ! ${form.fullname}.</h3>    
      <h3>Thời gian khám bệnh: ${schedule}, ${date}</h3>
      <h3>Giá khám: ${price}</h3>
      Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ đặt lịch khám bệnh, xin chân thành cảm ơn.
      <h3>
        <a href=${redirectLink} target='_blank'>Nhấn vào đây</a>
      </h3>`;
    }

    return emailStr;
  };

  convertDateToTimestamp = (date) => {
    const DMY_dateStr = CommonUtils.convertObjDateTo_DMYstr(date);
    const strDateToTimestamp =
      CommonUtils.convertStrDateToTimestamp(DMY_dateStr);

    return strDateToTimestamp;
  };

  submitHandle = async () => {
    const { form } = this.state;
    const { modalData, doctorId } = this.props;
    const { timeType, date } = modalData;

    const dateToTimestamp = this.convertDateToTimestamp(form.birthday);

    if (typeof dateToTimestamp === 'number') {
      let statesSubmit = {
        ...form,
        doctorId,
        birthday: dateToTimestamp,
        timeType,
        date,
      };

      const isValid = this.checkingInputValues(statesSubmit);
      if (isValid) {
        const token = uuidv4();
        statesSubmit = {
          ...statesSubmit,
          emailContent: this.renderEmailContent(token),
          token: token,
        };

        const data = await this.props.postUserBookingFn(statesSubmit);
        if (data.errCode === 0) {
          this.resettingForm();
          this.props.toggleModalFn();
        }
      }
    }
  };

  render() {
    const { toggleModalFn, isOpen, doctorId } = this.props;
    const { form, introBookingInfo } = this.state;
    const { fullname, phoneNumber, email, address, reason, birthday, gender } =
      form;
    const {
      titleL,
      fullnameL,
      phoneNumberL,
      emailL,
      addressL,
      reasonL,
      birthdayL,
      genderL,
      addNewL,
      cancelL,
    } = bookingModalLangs;

    return (
      <Modal
        isOpen={isOpen}
        centered
        size='lg'
        className='bookingModal-content'
      >
        <ModalHeader toggle={toggleModalFn}>
          <FormattedMessage id={titleL} />
        </ModalHeader>

        <Row className='modal-doctorIntro'>
          {doctorId && introBookingInfo && (
            <DoctorIntro
              doctorId={doctorId}
              introBookingInfo={introBookingInfo}
            />
          )}
        </Row>

        <ModalBody>
          <Form>
            <Row>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='fullnameFor'>
                    <FormattedMessage id={fullnameL} />
                  </Label>
                  <Input
                    type='text'
                    name='fullname'
                    value={fullname}
                    id='fullnameFor'
                    placeholder={this.renderMessageL(fullnameL)}
                    onChange={this.formOnchange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='phoneNumberFor'>
                    <FormattedMessage id={phoneNumberL} />
                  </Label>
                  <Input
                    type='number'
                    name='phoneNumber'
                    value={phoneNumber}
                    id='phoneNumberFor'
                    placeholder={this.renderMessageL(phoneNumberL)}
                    onChange={this.formOnchange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='emailFor'>
                    <FormattedMessage id={emailL} />
                  </Label>
                  <Input
                    type='email'
                    name='email'
                    value={email}
                    id='emailFor'
                    placeholder={this.renderMessageL(emailL)}
                    onChange={this.formOnchange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='addressFor'>
                    <FormattedMessage id={addressL} />
                  </Label>
                  <Input
                    type='text'
                    name='address'
                    value={address}
                    id='addressFor'
                    placeholder={this.renderMessageL(addressL)}
                    onChange={this.formOnchange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className='mb-3'>
                <FormGroup>
                  <Label for='reasonFor'>
                    <FormattedMessage id={reasonL} />
                  </Label>
                  <Input
                    type='text'
                    name='reason'
                    value={reason}
                    id='reasonFor'
                    placeholder={this.renderMessageL(reasonL)}
                    onChange={this.formOnchange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='birthdayFor'>
                    <FormattedMessage id={birthdayL} />
                  </Label>
                  <DatePickerCustom
                    maxDate={true}
                    startDate={birthday}
                    getDatePicker={this.getDatePicker}
                  />
                </FormGroup>
              </Col>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='genderFor'>
                    <FormattedMessage id={genderL} />
                  </Label>
                  <Input
                    type='select'
                    name='gender'
                    value={gender}
                    id='genderFor'
                    placeholder={this.renderMessageL(genderL)}
                    onChange={this.formOnchange}
                  >
                    {this.renderGenderList()}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.submitHandle}>
            <FormattedMessage id={addNewL} />
          </Button>
          <Button color='danger' onClick={toggleModalFn}>
            <FormattedMessage id={cancelL} />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  genderList: state.admin.genderList,
  priceList: state.admin.priceList,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  postUserBookingFn: (newData) => dispatch(actions.postUserBookingFn(newData)),
  fetchUserAllcodeFn: () => dispatch(actions.fetchUserAllcodeFn()),
  getDoctorExtraInfoFn: (doctorId) =>
    dispatch(actions.getDoctorExtraInfoFn(doctorId)),
  fetchDoctorInfoAllcodeFn: () => dispatch(actions.fetchDoctorInfoAllcodeFn()),
});

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(BookingModal);
