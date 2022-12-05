import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PatientManager.scss';
import 'dotenv/config';
import SelectComp from './../generalComps/SelectComp';
import { getDoctorPatientsByIdServ } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import CommonUtils from './../../../utils/CommonUtils';
import moment from 'moment';
import BillModal from './BillModal';

//src28, v107xx1,
class PatientManager extends Component {
  state = {
    doctorData: null, //v50xx1
    patientData: null,
    uniqueTimeStampList: null,
    dateSelected: null,

    openModal: false,
    modalData: {
      id: null,
      patientId: null,
      email: null,
      doctorId: null,
    },
  };

  componentDidMount = async () => {
    if (this.props.userInfo) {
      const { userInfo } = this.props;
      const data = await getDoctorPatientsByIdServ(userInfo.id);
      if (data.errCode === 0) {
        this.filterAllDataLoadedToState(data);
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { language } = this.props;
    if (language !== prevProps.language) {
      if (this.state.doctorData) {
        const { uniqueTimeStampList } = this.state;

        if (uniqueTimeStampList.length > 0) {
          const scheduleOpt = this.handleDateByLangsForUi(uniqueTimeStampList);

          // v50xx1
          this.setState({
            doctorData: {
              ...this.state.doctorData,
              scheduleOpt,
            },
          });
        }
      }
    }
  };

  getFullname = (firstname, lastname) => {
    if (this.props.language === LANGUAGES.EN) {
      return firstname + ' ' + lastname;
    }
    return lastname + ' ' + firstname;
  };

  getTimeStampCurrentDate = () => {
    const getDayOnly = 'L';
    const getDate = moment(new Date()).format(getDayOnly);
    const timestampDate = Date.parse(getDate);
    return timestampDate;
  };

  filterUniqueValues = (list) => {
    const noDuplicatedList = [];
    list.forEach((item) => {
      if (!noDuplicatedList.includes(item)) {
        noDuplicatedList.push(item);
      }
    });
    return noDuplicatedList;
  };

  handleDateByLangsForUi = (list) => {
    CommonUtils.switchLangLocally(this.props.language); // v108xx5
    const ALLselect = { idx: 0, value: 'ALL', label: 'ALL' };
    const currentDate = this.getTimeStampCurrentDate();
    const filteredList = [];

    filteredList.push(ALLselect);

    list.forEach((item, idx) => {
      if (item >= currentDate) {
        const formattedDate = CommonUtils.convertTimestampTo_dDMstr(item);
        const optSelect = {
          idx: idx + 1,
          value: item,
          label: formattedDate,
        };
        filteredList.push(optSelect);
      }
    });

    return filteredList;
  };

  filterAllDataLoadedToState = (data) => {
    const { doctor, patientList } = data;
    let scheduleTimestamp = [];

    const patientData = patientList.map((item) => {
      const { birthday, patientInfoData, timeTypeBookedData, id, patientId } =
        item;

      scheduleTimestamp.push(item.date);
      return {
        id,
        patientId,
        dateBooked: item.date,
        birthday,
        timeTypeBookedData,
        ...patientInfoData,
      };
    });

    // v108xx
    const uniqueListSorted = this.filterUniqueValues(scheduleTimestamp).sort();
    const uiList = this.handleDateByLangsForUi(uniqueListSorted);

    // v50xx1
    const doctorData = {
      ...doctor,
      scheduleOpt: uiList,
    };

    if (doctorData && patientData) {
      this.setState({
        doctorData, //v50xx1
        patientData,
        uniqueTimeStampList: uniqueListSorted,
      });
    }
  };

  getSelectedValue = (value) => {
    this.setState({
      dateSelected: value,
    });
  };

  renderSelect = () => {
    return (
      <SelectComp
        arrPassed={this.state.doctorData.scheduleOpt}
        getSelectedValue={this.getSelectedValue}
      />
    );
  };

  getValuesInLangs = (objData) => {
    if (this.props.language === LANGUAGES.EN) {
      return objData.valueEN;
    }
    return objData.valueVI;
  };

  getDateConverted = (timestamp) => {
    const formattedDate = CommonUtils.convertTimestampTo_DMYstr(timestamp); //v108xx6
    return formattedDate;
  };

  handleConfirm = (id, email, patientId) => {
    const { doctorData, modalData } = this.state;
    this.setState({
      openModal: !this.state.openModal, //v109xx1
      modalData: {
        ...modalData,
        id,
        email,
        patientId,
        doctorId: doctorData.id,
      },
    });
  };

  renderTable = (list) => {
    let num = 1;
    const body = [];
    const getAll = 'ALL';
    const { dateSelected } = this.state;

    list.forEach((objItem, idx) => {
      const {
        id,
        patientId,
        address,
        birthday,
        dateBooked,
        email,
        firstName,
        genderData,
        lastName,
        phoneNumber,
        timeTypeBookedData,
      } = objItem;

      if (dateSelected === dateBooked || dateSelected === getAll) {
        const item = (
          <tr key={idx}>
            <td className='numeric'>{num++}</td>
            <td>{this.getFullname(firstName, lastName)}</td>
            <td>{phoneNumber}</td>
            <td>{this.getValuesInLangs(genderData)}</td>
            <td>{this.getDateConverted(birthday)}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td>{this.getDateConverted(dateBooked)}</td>
            <td>{this.getValuesInLangs(timeTypeBookedData)}</td>
            <td className='action-btn'>
              <button
                type='button'
                className='btn btn-info'
                onClick={() => this.handleConfirm(id, email, patientId)}
              >
                Confirm
              </button>
            </td>
          </tr>
        );
        body.push(item);
      }
    });

    const table = (
      <>
        <thead className='table-success'>
          <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Fullname</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Gender</th>
            <th scope='col'>
              <div>(D/M/Y)</div>
              <div>Birthday</div>
            </th>
            <th scope='col'>Email</th>
            <th scope='col'>Address</th>
            <th scope='col'>Booking date</th>
            <th scope='col'>Time</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>

        <tbody className='table-body'>
          {body.length > 0 ? (
            body
          ) : (
            //53ms11ss
            <tr>
              <td colSpan='10' style={{ textAlign: 'center' }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </>
    );

    return table;
  };

  render() {
    const { doctorData, patientData, openModal, modalData } = this.state;

    // v107xx1
    return (
      <>
        <div className='PatientManager-content'>
          <h4>Patient manager</h4>
          <h3>
            {doctorData &&
              `Doctor: ${doctorData.firstName} - ${doctorData.email}`}
          </h3>
          <div className='date-selected'>
            {doctorData && this.renderSelect()}
          </div>
          <table className='table table-sm table-hover table-bordered'>
            {patientData && this.renderTable(patientData)}
          </table>
        </div>
        <div>
          {
            <BillModal
              openModal={openModal} //v109xx1
              modalData={modalData}
            />
          }
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo, //v107xx1
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientManager);
