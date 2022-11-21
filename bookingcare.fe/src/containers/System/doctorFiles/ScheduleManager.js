import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './ScheduleManager.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import { scheduleManagerLangs } from '../../../connectSupplyFE/otherSupplies';
import 'dotenv/config';
import DatePickerCustom from './DatePickerCustom';

class ScheduleManager extends Component {
  state = {
    startDate: new Date(),
    doctorId: null,
    selectedDoctor: null,
    firstTimemarks: null,
    secondTimemarks: null,
    doctorOptions: [],
  };

  componentDidMount = async () => {
    const {
      fetchAllDoctorsFn,
      fetchAllScheduleFn,
      allDoctors,
      doctorSchedule,
    } = this.props;

    if (allDoctors.length === 0 || doctorSchedule.length === 0) {
      await fetchAllDoctorsFn();
      await fetchAllScheduleFn();
    } else if (allDoctors.length > 0) {
      this.loadingDoctorOptions();
      this.renderTimemarks();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { allDoctors, language, doctorSchedule } = this.props;

    if (
      prevProps.allDoctors.length !== allDoctors.length ||
      prevProps.doctorSchedule.length !== doctorSchedule.length
    ) {
      this.loadingDoctorOptions();
      this.renderTimemarks();
    } else if (prevProps.language !== language) {
      if (allDoctors.length > 0) {
        this.loadingDoctorOptions();
        this.renderTimemarks();
      }
    }
  };

  getDatePicker = (date) => {
    this.setState({
      startDate: date,
    });
  };

  doctorOptionsByLangs = () => {
    let doctorId = null;
    let doctorOptions = [];
    let tempSelected = null;
    const { allDoctors, language } = this.props;
    const { selectedDoctor } = this.state;

    if (selectedDoctor) {
      doctorId = selectedDoctor.doctorId;
    }

    if (language === LANGUAGES.EN) {
      doctorOptions = allDoctors.map((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        if (doctorId === item.id) {
          tempSelected = {
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
          tempSelected = {
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
      tempSelected,
    };
  };

  loadingDoctorOptions = () => {
    const { doctorOptions, tempSelected } = this.doctorOptionsByLangs();

    this.setState({
      doctorOptions: doctorOptions,
      selectedDoctor: tempSelected,
      doctorId: tempSelected ? tempSelected.doctorId : null,
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
      return event.target.classList.toggle('active');
    } else if (activedTimemarks && activedTimemarks.length > 0) {
      for (let item of activedTimemarks) {
        item.classList.remove('active');
      }
      return;
    }
  };

  renderTimemarks = () => {
    const { doctorSchedule, language } = this.props;

    if (doctorSchedule && doctorSchedule.length > 0) {
      const firstTimemarks = [];
      const secondTimemarks = [];
      const timeMarkcol = 4;

      doctorSchedule.map((item, idx) => {
        let value = (
          <button
            key={idx}
            name={item.keymap}
            type='button'
            className='btn btn-timeMark'
            onClick={this.handleTimemark}
          >
            {language === LANGUAGES.EN ? item.valueEN : item.valueVI}
          </button>
        );

        if (idx < timeMarkcol) {
          firstTimemarks.push(value);
        } else {
          secondTimemarks.push(value);
        }
        return null;
      });

      this.setState({
        firstTimemarks,
        secondTimemarks,
      });
    }
  };

  clearActivedTimemark = () => {
    const activedBtns = document.querySelectorAll('div .btn-timeMark.active');
    this.handleTimemark(null, activedBtns);
  };

  getActivedTimemark = () => {
    const activedBtns = document.querySelectorAll('div .btn-timeMark.active');

    if (activedBtns && activedBtns.length > 0) {
      let selectedMarktimes = [];

      for (let item of activedBtns) {
        const { name: timeType } = item;
        selectedMarktimes.push(timeType);
      }

      return selectedMarktimes;
    }
    return null;
  };

  validationsSchedule = (states) => {
    let isValid = true;
    for (let key in states) {
      if (
        states[key] === '' ||
        states[key] === null ||
        states[key] === undefined
      ) {
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
      selectedDoctor: null,
      doctorId: null,
    });
  };

  handleSchedule = () => {
    const { doctorId, startDate } = this.state;
    const activedMarktimes = this.getActivedTimemark();
    const formattedDate = CommonUtils.convertObjDateTo_DMY_str(startDate);
    const maxNumber = process.env.REACT_APP_MAX_NUMBER_SCHEDULE;
    const isValid = this.validationsSchedule({
      activedMarktimes,
      doctorId,
      formattedDate,
    });

    if (isValid) {
      return activedMarktimes.map((timeType) => {
        return {
          doctorId,
          maxNumber,
          date: formattedDate,
          timeType,
        };
      });
    }
    return null;
  };

  submitSchedule = async () => {
    const schedulesArr = this.handleSchedule();

    if (schedulesArr && schedulesArr.length > 0) {
      const { uploadDoctorScheduleFn } = this.props;
      const data = await uploadDoctorScheduleFn(schedulesArr);
      if (data.errCode === 0) {
        this.clearForm();
      }
    }
  };

  render() {
    const {
      mainTitleL,
      chooseUserL,
      chooseDateL,
      doctorScheduleL,
      cancelL,
      saveL,
    } = scheduleManagerLangs;

    const { firstTimemarks, secondTimemarks, startDate } = this.state;

    return (
      <div className='scheduleManager-content container'>
        <h4 className='scheduleManager-content-title'>
          <FormattedMessage id={mainTitleL} />
        </h4>
        <div className='scheduleManager-selections'>
          <div className='scheduleManager-select-doctor col-6'>
            <h6 className=''>
              <FormattedMessage id={chooseUserL} />
            </h6>
            {this.renderSelections()}
          </div>
          <div className=' col-6'>
            <h6>
              <FormattedMessage id={chooseDateL} />
            </h6>
            <DatePickerCustom
              startDate={startDate}
              minDate={true}
              getDatePicker={this.getDatePicker}
            />
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
              {firstTimemarks && firstTimemarks.length > 0 && firstTimemarks}
            </div>
            <div className='timeMark col-6'>
              {secondTimemarks && secondTimemarks.length > 0 && secondTimemarks}
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
    doctorSchedule: state.admin.doctorSchedule,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadDoctorScheduleFn: (dataArr) =>
      dispatch(actions.uploadDoctorScheduleFn(dataArr)),
    fetchAllScheduleFn: () => dispatch(actions.fetchDoctorScheduleFn()),
    fetchAllDoctorsFn: () => dispatch(actions.fetchAllDoctorsFn()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManager);
