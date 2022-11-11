import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorDetail.scss';
import * as actions from '../../../store/actions';
import { dateFormat, LANGUAGES } from '../../../utils';
import Select from 'react-select';
import './DoctorSchedule.scss';
import moment from 'moment';
// import 'moment/locale/vi'; //v84xx7, v84xx8
import { FormattedMessage } from 'react-intl';
import { doctorScheduleLangs } from '../../../connectSupplyFE/otherSupplies';

//src23, v84xx5
class DoctorSchedule extends Component {
  state = {
    selectedDate: null,
    wholeList: [],
    sortedList: [],
    datesOptions: [],
  };

  componentDidMount = async () => {
    const { doctorId, fetchDoctorScheduleByIdFn } = this.props;
    if (doctorId) {
      const data = await fetchDoctorScheduleByIdFn(doctorId); //v84xx4

      if (data.errCode === 0) {
        const { timestampList, sortedMinDate } =
          this.handleStrDatesToSortedDates(data.doctorSchedule);

        if (sortedMinDate && sortedMinDate.length > 0) {
          const { datesOptions } = this.handleDateByLangs(sortedMinDate);

          //12ms41ss
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
        const { datesOptions } = this.handleDateByLangs(sortedList);

        //12ms41ss
        this.setState({
          datesOptions,
          selectedDate: datesOptions[selectedDate.idx],
        });
      }
    }
  };

  dateListForSelectUi = (dateList) => {
    const { language } = this.props;
    const { selectionFormat } = dateFormat;
    const currentDate = this.getTimeStampCurrentDate();

    const tempList = dateList.map((date, idx) => {
      const timestampToDate = new Date(date);
      let formattedDate = moment(timestampToDate).format(selectionFormat); //v84xx10

      // 54ms19ss
      if (date === currentDate) {
        const getDate = formattedDate.split(',')[1];
        formattedDate =
          language === LANGUAGES.EN
            ? `Today, ${getDate}`
            : `Hôm nay, ${getDate}`;
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
        // let test = require('moment/locale/vi'); //v84xx7
        moment.updateLocale('vi', { weekdays: weekdaysVI }); //v86xx2
        // moment.locale('vi', { weekdays: weekdaysVI }); //v84xx8
      } else {
        moment.updateLocale('en', { weekdays: weekdaysEN }); //v84xx8
      }

      return { datesOptions: this.dateListForSelectUi(dateList) };
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
      const strToDate = moment(item.date, dateFormat.selectionFormat); //v84xx10
      const dateToTimestamp = Date.parse(strToDate);
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
          noDuplicationList.push(item.date); //1.avoid duplications

          if (item.date >= currentDate) {
            minDateList.push(item.date); //2.selected dates >= current
          }
        }
      });
    }
    return minDateList;
  };

  getHiddenTimemarks = () => {
    const { selectedDate } = this.state;

    // v86xx1
    if (
      selectedDate.label.includes('Today') ||
      selectedDate.label.includes('Hôm nay')
    ) {
      const currentHour = new Date().getHours();
      const marktimeSighs = {
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
        return 'fulltime';
      }

      for (const key in marktimeSighs) {
        if (marktimeSighs[key] === currentHour) {
          return key;
        }
      }
    }
  };

  renderTimemarks = () => {
    const tempList = this.getTimemarks();

    if (tempList && tempList.length > 0) {
      const hiddenAt = this.getHiddenTimemarks(); //2ms48ss
      const length = tempList.length;
      let timemarkList = [];

      for (let idx = 0; idx < length; idx++) {
        const { timeType, timeTypeData } = tempList[idx];

        if (timeType < hiddenAt || hiddenAt === 'fulltime') {
          continue; //2ms48ss
        }

        timemarkList.push(
          <button
            key={idx}
            name={timeType}
            type='button'
            className='btn btn-timeMark'
            onClick={this.handleTimemark}
          >
            {this.props.language === LANGUAGES.EN
              ? timeTypeData.valueEN
              : timeTypeData.valueVI}
          </button>,
        );
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
        <FormattedMessage
          id={doctorScheduleLangs.noSchedule} // 25ms30ss
        />
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

  // v84xx11
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

  render() {
    // console.log('re-render'); //12ms41ss
    const { datesOptions } = this.state;
    const { address } = this.props;
    const { schedule, clinicAddress, price, insuranceType, booking } =
      doctorScheduleLangs; //25ms30ss

    return (
      <>
        <div className='DoctorSchedule'>
          <div className='DoctorSchedule-date'>{this.renderSelections()}</div>
          {/* 18ms10ss */}
          <div className='DoctorSchedule-info'>
            <div className='DoctorSchedule-info-marktime'>
              <h5>
                <FormattedMessage id={schedule} />
              </h5>
              {datesOptions.length > 0 && this.renderTimemarks()}
              <div>
                <FormattedMessage id={booking} />
              </div>
            </div>
            <div className='DoctorSchedule-info-address'>
              <h5>
                <FormattedMessage id={clinicAddress} />
                {address}
              </h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorScheduleByIdFn: (doctorId) =>
    dispatch(actions.fetchDoctorScheduleByIdFn(doctorId)), //v84xx4
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
