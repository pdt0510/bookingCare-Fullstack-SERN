import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import * as actions from '../../../store/actions';
import { CommonUtils, dateFormat, LANGUAGES } from '../../../utils';
import Select from 'react-select';
import moment from 'moment';

import { FormattedMessage } from 'react-intl';
import { doctorScheduleLangs } from '../../../connectSupplyFE/otherSupplies';
import { DOCTORSCHEDULE_DEFAULTS } from './../../../utils/constant';
import BookingModal from './modal/BookingModal';

class DoctorSchedule extends Component {
  state = {
    selectedDate: null,
    wholeList: [],
    sortedList: [],
    datesOptions: [],
    isOpen: false,
    modalData: null,
  };

  componentDidMount = async () => {
    const { doctorId } = this.props;
    if (doctorId) {
      const { fetchDoctorScheduleByIdFn } = this.props;
      const data = await fetchDoctorScheduleByIdFn(doctorId);

      if (data.errCode === 0) {
        const { timestampList, sortedMinDate } =
          this.handleStrDatesToSortedDates(data.doctorSchedule);

        if (sortedMinDate && sortedMinDate.length > 0) {
          const datesOptions = this.handleDateByLangs(sortedMinDate);

          this.setState({
            wholeList: timestampList,
            sortedList: sortedMinDate,
            datesOptions: datesOptions,
            selectedDate: datesOptions[0],
          });
        }
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { language } = this.props;
    const { sortedList } = this.state;

    if (sortedList && sortedList.length > 0) {
      if (prevProps.language !== language) {
        const { selectedDate } = this.state;
        const datesOptions = this.handleDateByLangs(sortedList);

        this.setState({
          datesOptions,
          selectedDate: datesOptions[selectedDate.idx],
        });
      }
    }
  };

  dateListForSelectUi = (dateList) => {
    const { language } = this.props;
    const { today, homNay } = DOCTORSCHEDULE_DEFAULTS;
    const currentDate = this.getTimeStampCurrentDate();

    const tempList = dateList.map((date, idx) => {
      const timestampToDate = new Date(date);
      let formattedDate = CommonUtils.convertObjDateTo_dDM_str(timestampToDate);
      if (date === currentDate) {
        const getDate = formattedDate.split(',')[1];
        formattedDate =
          language === LANGUAGES.EN
            ? `${today}, ${getDate}`
            : `${homNay}, ${getDate}`;
      }

      return {
        value: date,
        label: formattedDate,
        idx,
      };
    });
    return tempList;
  };

  handleDateByLangs = (dateList) => {
    if (dateList && dateList.length > 0) {
      const { language } = this.props;
      const { weekdaysVI, weekdaysEN } = dateFormat;

      if (language === LANGUAGES.VI) {
        moment.updateLocale(LANGUAGES.VI, { weekdays: weekdaysVI });
      } else {
        moment.updateLocale(LANGUAGES.EN, { weekdays: weekdaysEN });
      }
      const datesOptions = this.dateListForSelectUi(dateList);
      return datesOptions;
    }

    return null;
  };

  handleStrDatesToSortedDates = (dateList) => {
    if (dateList && dateList.length > 0) {
      const timestampList = this.convertStrToTimestamp(dateList);

      if (timestampList && timestampList.length > 0) {
        const minDateList = this.filterBy2Conditions(timestampList);

        if (minDateList && minDateList.length > 0) {
          const sortedMinDate = minDateList.sort(
            (Adate, Bdate) => Adate - Bdate,
          );

          return {
            timestampList,
            sortedMinDate,
          };
        }
      }
    }
    return {};
  };

  getTimeStampCurrentDate = () => {
    const getDayOnly = 'L';
    const getDate = moment(new Date()).format(getDayOnly);
    const timestampDate = Date.parse(getDate);
    return timestampDate;
  };

  convertStrToTimestamp = (dateList) => {
    const listCloned = [...dateList];
    const strToTimetampList = listCloned.map((item) => {
      const dateToTimestamp = CommonUtils.convertStrDateToTimestamp(item.date);
      return {
        ...item,
        date: dateToTimestamp,
      };
    });

    return strToTimetampList;
  };

  filterBy2Conditions = (dateList) => {
    let minDateList = [];
    const currentDate = this.getTimeStampCurrentDate();

    if (dateList && dateList.length > 0) {
      const noDuplicationList = [];

      dateList.forEach((item) => {
        if (!noDuplicationList.includes(item.date)) {
          noDuplicationList.push(item.date);

          if (item.date >= currentDate) {
            minDateList.push(item.date);
          }
        }
      });
    }
    return minDateList;
  };

  getHiddenTimemarks = () => {
    const { label } = this.state.selectedDate;
    const { today, homNay, fulltime } = DOCTORSCHEDULE_DEFAULTS;

    if (label.includes(today) || label.includes(homNay)) {
      const currentHour = new Date().getHours();
      const marktimeSighs = {
        T0: 0,
        T1: 8,
        T2: 9,
        T3: 10,
        T4: 11,
        T5: 13,
        T6: 14,
        T7: 15,
        T8: 16,
      };
      if (currentHour > marktimeSighs.T8) {
        return fulltime;
      }

      for (const key in marktimeSighs) {
        if (marktimeSighs[key] === currentHour) {
          return key;
        }
      }
    }
    return 'T0';
  };

  renderTimemarks = () => {
    const tempList = this.getTimemarks();
    const { fulltime } = DOCTORSCHEDULE_DEFAULTS;

    if (tempList && tempList.length > 0) {
      const hiddenAt = this.getHiddenTimemarks();
      const length = tempList.length;
      let timemarkList = [];

      if (hiddenAt !== fulltime) {
        for (let idx = 0; idx < length; idx++) {
          const { timeType, timeTypeData } = tempList[idx];

          if (timeType >= hiddenAt) {
            timemarkList.push(
              <button
                key={idx}
                value={timeType}
                type={timeType}
                className='btn btn-timeMark'
                onClick={() => this.toggleModalFn(tempList[idx])}
              >
                {this.props.language === LANGUAGES.EN
                  ? timeTypeData.valueEN
                  : timeTypeData.valueVI}
              </button>,
            );
          }
        }
      }

      if (timemarkList.length === 0) {
        return this.renderNoScheduleMessage();
      }

      return timemarkList;
    }
  };

  renderNoScheduleMessage = () => {
    return (
      <h4>
        <FormattedMessage id={doctorScheduleLangs.noScheduleL} />
      </h4>
    );
  };

  getTimemarks = () => {
    let tempList = [];
    const { selectedDate, wholeList } = this.state;

    if (Object.keys(selectedDate).length > 0 && wholeList.length > 0) {
      wholeList.forEach((item) => {
        if (item.date === selectedDate.value) {
          tempList.push({
            timeType: item.timeType,
            timeTypeData: item.timeTypeData,
          });
        }
      });
    }
    return tempList;
  };

  renderSelections = () => {
    const { selectedDate, datesOptions } = this.state;
    const mySelect = (
      <Select
        value={selectedDate}
        options={datesOptions}
        onChange={this.handleChange}
      />
    );
    return this.customSelectByHOC(mySelect);
  };

  handleChange = (selectedOption) => {
    this.setState({
      selectedDate: selectedOption,
    });
  };

  customSelectByHOC = ({ props }) => {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        width: 'fit-content',
        boxShadow: 'none',
        border: 'none',
        borderBottom: '1px solid gray',

        '&:hover': {
          cursor: 'pointer',
        },
      }),
    };
    return <Select {...props} styles={customStyles} />;
  };

  toggleModalFn = (item) => {
    const { isOpen } = this.state;
    const isOpened = false;
    let modalData = null;

    if (isOpen === isOpened) {
      modalData = {
        ...item,
        date: this.state.selectedDate.value,
      };
    }

    this.setState({
      modalData: modalData ? modalData : null,
      isOpen: !isOpen,
    });
  };

  render() {
    const { datesOptions, isOpen, modalData } = this.state;
    const { scheduleL, bookingL } = doctorScheduleLangs;
    const { doctorId } = this.props;

    return (
      <>
        <div className='DoctorSchedule'>
          <div className='DoctorSchedule-date'>{this.renderSelections()}</div>
          <div className='DoctorSchedule-info-marktime'>
            <h5>
              <FormattedMessage id={scheduleL} />
            </h5>
            {datesOptions.length > 0 && this.renderTimemarks()}
            <div>
              <FormattedMessage id={bookingL} />
            </div>
          </div>
        </div>
        {isOpen && doctorId && (
          <BookingModal
            isOpen={isOpen}
            doctorId={doctorId}
            modalData={modalData ? modalData : null}
            toggleModalFn={this.toggleModalFn}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorScheduleByIdFn: (doctorId) =>
    dispatch(actions.fetchDoctorScheduleByIdFn(doctorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
