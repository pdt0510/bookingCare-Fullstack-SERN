import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './DatePickerCustom.scss';
import { LANGUAGES } from '../../../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
import 'dotenv/config';

//src25, v94xx1
class DatePickerCustom extends Component {
  datePickerVI = () => {
    const day = 'CN_T2_T3_T4_T5_T6_T7'.split('_');
    const months =
      'Th-1_Th-2_Th-3_Th-4_Th-5_Th-6_Th-7_Th-8_Th-9_Th-10_Th-11_Th-12'.split(
        '_',
      );

    return {
      localize: {
        day: (n) => day[n],
        month: (n) => months[n],
      },
      formatLong: {
        date: () => 'dd/MM/yyyy',
      },
    };
  };

  handleNewDate = (date) => {
    this.props.getDatePicker(date);
  };

  renderPickerDate = () => {
    const { startDate, minDate, maxDate } = this.props;
    const customDatePicker = this.datePickerVI();

    // v94xx1
    const customProps = {
      minDate: minDate ? new Date() : null,
      maxDate: maxDate ? new Date() : null,
    };

    return (
      <DatePicker
        {...customProps}
        selected={startDate}
        onChange={this.handleNewDate}
        dateFormat={customDatePicker.formatLong.date()}
        locale={
          this.props.language === LANGUAGES.VI
            ? { ...vi, ...customDatePicker }
            : ''
        }
      />
    );
  };

  render() {
    return (
      <div className='customize-datePicker'>{this.renderPickerDate()}</div>
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DatePickerCustom);
