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

//src25, v91xx1
class BookingModal extends Component {
  // v93xx1
  state = {
    form: {
      fullname: '', //v93xx2
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthday: new Date(),
      gender: '',
    },

    //others
    doctorId: '',
    doctorPriceVI: '',
    doctorPriceUSD: '',
    introBookingInfo: '',
  };

  componentDidMount = async () => {
    if (this.props.modalData) {
      const {
        fetchDoctorInfoAllcodeFn,
        getDoctorExtraInfoFn,
        fetchUserAllcodeFn,
        modalData,
      } = this.props;

      await fetchUserAllcodeFn();
      await fetchDoctorInfoAllcodeFn();
      const doctorExtra = await getDoctorExtraInfoFn(modalData.doctorId);

      if (doctorExtra.data) {
        const { priceList } = this.props;
        const { date, timeTypeData, doctorId } = modalData;
        const { priceId } = doctorExtra.data;

        const doctorPrice = CommonUtils.formatCurrency(priceId, priceList);

        const introBookingInfo = {
          price: this.renderPrice(
            doctorPrice.viCurrency,
            doctorPrice.dollarCurrency,
          ),
          schedule: this.renderSchedule(timeTypeData),
          date: this.renderDate(date),
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
          doctorId: doctorId,
          doctorPriceVI: doctorPrice.viCurrency,
          doctorPriceUSD: doctorPrice.dollarCurrency, // 26ms18ss
          introBookingInfo,
        });
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
        ...this.state.form, //v93xx2
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
        stateCloned[key] = ''; //v93xx1, v93xx2
      }
    }

    this.setState({
      ...stateCloned,
    });
  };

  renderPrice = (doctorPriceVI, doctorPriceUSD) => {
    const { language } = this.props;
    return language === LANGUAGES.EN
      ? ` ${doctorPriceUSD}$`
      : ` ${doctorPriceVI}đ`;
  };

  renderSchedule = (timeTypeData) => {
    const { language } = this.props;
    return language === LANGUAGES.EN
      ? ` ${timeTypeData.valueEN}`
      : ` ${timeTypeData.valueVI}`;
  };

  renderDate = (date) => {
    const timestampToDate = CommonUtils.convertTimestampToDate(date);
    const formattedDate = CommonUtils.convertDateToDD_MM_YYYY(timestampToDate);
    return ` ${formattedDate}`;
  };

  getDatePicker = (date) => {
    this.setState({
      form: {
        ...this.state.form, //v93xx2
        birthday: date,
      },
    });
  };

  convertDateToTimestamp = (date) => {
    const formattedDate = CommonUtils.convertDateToDD_MM_YYYY(date);
    const strToDate = CommonUtils.converStrToDateBydd_DD_MM(formattedDate);
    const dateToTimestamp = CommonUtils.convertDateToTimestamp(strToDate);
    return dateToTimestamp;
  };

  submitHandle = async () => {
    const { form, doctorId } = this.state;
    const { timeType, date } = this.props.modalData;

    const dateToTimestamp = this.convertDateToTimestamp(form.birthday);
    const statesSubmit = {
      ...form,
      doctorId,
      birthday: dateToTimestamp,
      timeType,
      date,
    };
    const isValid = this.checkingInputValues(statesSubmit);

    if (isValid) {
      const data = await this.props.postUserBookingFn(statesSubmit);

      if (data.errCode === 0) {
        this.resettingForm();
        this.props.toggleModalFn();
      }
    }
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

  render() {
    const { toggleModalFn, isOpen } = this.props;
    const { form, doctorId, introBookingInfo } = this.state;
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
        isOpen={isOpen} //v91xx1
        centered
        size='lg'
        className='bookingModal-content'
      >
        <ModalHeader
          toggle={toggleModalFn} //v91xx1
        >
          <FormattedMessage id={titleL} />
        </ModalHeader>

        {/* v92xx5 */}
        <Row className='modal-doctorIntro'>
          {doctorId && (
            <DoctorIntro
              doctorId={doctorId}
              introBookingInfo={introBookingInfo} //3ms59ss
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
                    maxDate={true} //v94xx1
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
