import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './ScheduleManager.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { dateFormat, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { scheduleManagerLangs } from '../../../connectSupplyFE/otherSupplies';

//src22, ScheduleManager1, 3ms06ss
class ScheduleManager extends Component {
  state = {
    doctorId: null,
    startDate: new Date(),
    selectedMarktimes: null,
    selectedDoctor: null,
    doctorOptions: [],
  };

  // 14ms35ss
  componentDidMount = async () => {
    const {
      fetchAllDoctorsFn,
      fetchAllScheduleFn, //42ms30ss
      allDoctors,
      doctorSchedule, //42ms30ss
    } = this.props;

    if (allDoctors.length === 0 || doctorSchedule.length === 0) {
      await fetchAllDoctorsFn();
      await fetchAllScheduleFn();
    } else if (allDoctors.length > 0) {
      this.loadingDoctorOptions();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { allDoctors, language } = this.props;
    if (prevProps.allDoctors.length !== allDoctors.length) {
      this.loadingDoctorOptions();
    } else if (allDoctors.length > 0) {
      if (prevProps.language !== language) {
        this.loadingDoctorOptions();
      }
    }
  };

  // 32ms40ss,
  formatDate = (date) => {
    let dateToTimestamp = null;
    let timestampToDate = null;

    if (date) {
      dateToTimestamp = Date.parse(date);
      timestampToDate = moment(date).format(dateFormat.SEND_TO_SERVER);

      // console.log('date ---', date, typeof date);
      // console.log('dateToTimestamp ---', dateToTimestamp, typeof dateToTimestamp);
      // console.log(
      //   'timestampToDate (m/d/y) ---',
      //   timestampToDate,
      //   typeof dateToTimestamp,
      // );
      // console.log(
      //   'timestampToDate (d/m/y) ---',
      //   moment(timestampToDate).format('DD/MM/YYYY'),
      // );
    }

    return {
      dateToTimestamp,
      timestampToDate,
    };
  };

  // v81xx2
  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  // 22ms39ss
  renderPickerDate = () => {
    return (
      <DatePicker //v81xx2
        selected={this.state.startDate}
        onChange={this.handleChangeDate}
        minDate={new Date()} //v81xx3
        name='startDate'
        dateFormat='dd/MM/yyyy'
      />
    );
  };

  doctorOptionsByLangs = () => {
    let doctorId = null;
    let doctorOptions = [];
    let selectedDoctor = null;
    const { allDoctors, language } = this.props;
    const { selectedDoctor } = this.state;

    if (selectedDoctor) {
      doctorId = selectedDoctor.doctorId;
    }

    if (language === LANGUAGES.EN) {
      doctorOptions = allDoctors.map((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        if (doctorId === item.id) {
          selectedDoctor = {
            value: fullName,
            label: fullName,
            doctorId: item.id,
          };
        }

        return {
          value: fullName,
          label: fullName,
          doctorId: item.id,
        };
      });
    } else {
      doctorOptions = allDoctors.map((item) => {
        const fullName = `${item.lastName} ${item.firstName}`;

        if (doctorId === item.id) {
          selectedDoctor = {
            value: fullName,
            label: fullName,
            doctorId: item.id,
          };
        }

        return {
          value: fullName,
          label: fullName,
          doctorId: item.id,
        };
      });
    }

    return {
      doctorOptions,
      selectedDoctor,
    };
  };

  loadingDoctorOptions = () => {
    const data = this.doctorOptionsByLangs();
    const { doctorOptions, selectedDoctor } = data;

    this.setState({
      doctorOptions: doctorOptions,
      selectedDoctor: selectedDoctor,
      doctorId: selectedDoctor ? selectedDoctor.doctorId : null,
    });
  };

  handleChange = (selectedOption) => {
    this.setState({
      selectedDoctor: selectedOption,
      doctorId: selectedOption.doctorId,
    });
  };

  renderSelections = () => {
    const { selectedDoctor, doctorOptions } = this.state;
    const customStyles = {
      control: (base, state) => {
        return {
          ...base,
          boxShadow: 'none',
        };
      },
    };

    return (
      <Select
        styles={customStyles}
        value={selectedDoctor}
        options={doctorOptions}
        onChange={this.handleChange}
      />
    );
  };

  handleTimemark = (event, activedTimemarks) => {
    if (event) {
      //js jquery, v82xx4
      return event.target.classList.toggle('active');
    } else {
      for (let item of activedTimemarks) {
        //removeClass() belongs to jQuery library,
        item.classList.remove('active'); //js jquery
      }
      return;
    }
  };

  // 42ms30ss
  renderTimemark = () => {
    const firstMark = [];
    const secondtMark = [];
    const timeMarkcol = 4;
    const { doctorSchedule, language } = this.props;

    if (doctorSchedule.length > 0) {
      doctorSchedule.map((item, idx) => {
        let value = (
          <button
            key={idx}
            name={item.keymap}
            type='button'
            className='btn btn-timeMark' //v82xx1
            onClick={this.handleTimemark}
          >
            {language === LANGUAGES.EN ? item.valueEN : item.valueVI}
          </button>
        );

        if (idx < timeMarkcol) {
          firstMark.push(value);
        } else {
          secondtMark.push(value);
        }
        return null;
      });
    }

    return { firstMark, secondtMark };
  };

  clearActivedTimemark = async () => {
    // const activedBtnArr = document.getElementsByClassName(
    //   'btn-timeMark active',
    // );

    /*v82xx4*/
    const activedBtns = document.querySelectorAll('div .btn-timeMark.active');
    this.handleTimemark(null, activedBtns);
  };

  getActivedTimemark = () => {
    let selectedMarktimes = null;
    const activedBtns = document.querySelectorAll('div .btn-timeMark.active');

    if (activedBtns.length > 0) {
      selectedMarktimes = [];
      for (let item of activedBtns) {
        const { name: time } = item;
        selectedMarktimes.push(time);
      }
    }
    return selectedMarktimes;
  };

  validationsSchedule = (states) => {
    let isValid = true;
    for (let key in states) {
      if (states[key] === '' || states[key] === null) {
        alert(`incorrect: ${key}`);
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  clearForm = () => {
    this.clearActivedTimemark();
    this.setState({
      startDate: new Date(),
      selectedMarktimes: null,
      selectedDoctor: null,
      doctorId: null,
    });
  };

  handleSchedule = () => {
    const { doctorId } = this.state;
    const marktimes = this.getActivedTimemark(); //v82xx2
    const { timestampToDate } = this.formatDate(this.state.startDate); // 32ms40ss

    const checkValidObj = {
      marktimes,
      doctorId,
      timestampToDate,
    };

    const isValid = this.validationsSchedule(checkValidObj);

    if (isValid) {
      return marktimes.map((item, idx) => {
        return {
          doctorId,
          date: timestampToDate,
          time: item,
        };
      });
    }

    return null;
  };

  // 28ms43ss
  submitSchedule = async () => {
    const result = this.handleSchedule();
    if (result && result.length > 0) {
      this.clearForm();
    }
    console.log(result);
  };

  // 4ms12ss
  render() {
    const { firstMark, secondtMark } = this.renderTimemark(); //42ms30ss

    const {
      mainTitleL,
      chooseUserL,
      chooseDateL,
      doctorScheduleL,
      cancelL,
      saveL,
    } = scheduleManagerLangs; //6ms02ss

    return (
      <div className='scheduleManager-content container'>
        <h4
          className='scheduleManager-content-title' //v81xx1
        >
          <FormattedMessage id={mainTitleL} />
        </h4>
        <div className='scheduleManager-selections'>
          <div className='scheduleManager-select-doctor col-6'>
            <h6
              className='' //v81xx1
            >
              <FormattedMessage id={chooseUserL} />
            </h6>
            {this.renderSelections()}
          </div>
          <div className='scheduleManager-select-date col-6'>
            <h6>
              <FormattedMessage id={chooseDateL} />
            </h6>
            {this.renderPickerDate()}
          </div>
        </div>
        <div className='scheduleManager-timeMark'>
          <div className='timeMark-title'>
            <h6 className='col-12'>
              <FormattedMessage id={doctorScheduleL} />
            </h6>
          </div>
          <div className='timeMark-display'>
            <div className='timeMark col-6'>
              {firstMark && firstMark.length > 0 && firstMark}
            </div>
            <div className='timeMark col-6'>
              {secondtMark && secondtMark.length > 0 && secondtMark}
            </div>
          </div>
        </div>
        <div className='btn-save-mark col-12'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={this.clearForm}
          >
            <FormattedMessage id={cancelL} />
          </button>
          <button
            type='button'
            className='btn btn-primary'
            onClick={this.submitSchedule}
          >
            <FormattedMessage id={saveL} />
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    doctorSchedule: state.admin.doctorSchedule, //42ms30ss
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllScheduleFn: () => dispatch(actions.fetchDoctorScheduleFn()), //42ms30ss
    fetchAllDoctorsFn: () => dispatch(actions.fetchAllDoctorsFn()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManager);
