import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import * as actions from '../../../store/actions';
import { DOCTOR_EXTRA_INFO_DEFAULTS, LANGUAGES } from '../../../utils';

import { FormattedMessage } from 'react-intl';
import { doctorScheduleLangs } from '../../../connectSupplyFE/otherSupplies';

//src24, v89xx2
class DoctorExtraInfo extends Component {
  state = {
    doctorPriceVI: null,
    doctorPriceUSD: null,
    openPriceTable: false,
  };

  componentDidMount = async () => {
    await this.props.fetchDoctorInfoAllcodeFn();
    const doctorPrice = this.formatCurrencyByLangs();

    this.setState({
      doctorPriceVI: doctorPrice.viCurrency,
      doctorPriceUSD: doctorPrice.dollarCurrency,
    });
  };

  formatCurrencyByLangs = () => {
    const { priceList, priceId } = this.props;
    const priceLength = priceList.length;

    for (let idx = 0; idx < priceLength; idx++) {
      let viCurrency = null;
      let dollarCurrency = null;

      if (priceList[idx].keymap === priceId) {
        dollarCurrency = `${priceList[idx].valueEN}`;
        viCurrency = `${priceList[idx].valueVI.slice(0, 3)}.000`;

        return { viCurrency, dollarCurrency };
      }
    }
  };

  getDoctorPriceByLangs = (addDot = true) => {
    let doctorPrice = null;
    const { language } = this.props;
    const { doctorPriceUSD, doctorPriceVI } = this.state;

    if (language === LANGUAGES.EN) {
      doctorPrice = (
        <>
          {doctorPriceUSD}
          <span className='currency-mark'>$</span>
          {addDot ? '. ' : null}
        </>
      );
    } else {
      doctorPrice = (
        <>
          {doctorPriceVI}
          <span className='currency-mark'>đ</span>
          {addDot ? '. ' : null}
        </>
      );
    }

    return doctorPrice;
  };

  toggleTable = (name, value) => {
    this.setState({
      [name]: !value,
    });
  };

  renderPriceTable = () => {
    return (
      <div className='DoctorExtraInfo-price-table'>
        <span className='price-table price-table-up'>
          <div className='price-table-mes'>
            <h6>
              <FormattedMessage id={doctorScheduleLangs.priceL} />
            </h6>
            <h6>{this.getDoctorPriceByLangs(false)}</h6>
          </div>
          Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho
          người nước ngoài là 30 USD
        </span>
        <span className='price-table price-table-down'>
          Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt
          thẻ
        </span>
      </div>
    );
  };

  render() {
    const { openPriceTable } = this.state;
    const { clinicAddress, clinicName } = this.props;
    const { clinicAddressL, priceL } = doctorScheduleLangs;
    const { hideTable, seeMore } = DOCTOR_EXTRA_INFO_DEFAULTS;

    return (
      <div className='DoctorExtraInfo-content'>
        <div className='separate-line'>
          <div className='DoctorExtraInfo-address separate-line-space'>
            <span className='DoctorExtraInfo-label'>
              <FormattedMessage id={clinicAddressL} />
            </span>
            <span className='DoctorExtraInfo-clinicName'>{clinicName}</span>
            <span className='DoctorExtraInfo-clinicAddress'>
              {clinicAddress}
            </span>
          </div>
          <div className='DoctorExtraInfo-price separate-line-space'>
            <span className='DoctorExtraInfo-label'>
              <FormattedMessage id={priceL} />
            </span>
            {
              openPriceTable
                ? this.renderPriceTable()
                : this.getDoctorPriceByLangs() // 51ms21ss
            }

            <span
              className='DoctorExtraInfo-priceTable-label'
              onClick={() => this.toggleTable('openPriceTable', openPriceTable)} //51ms21ss
            >
              {openPriceTable ? hideTable : seeMore}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  priceList: state.admin.priceList, //v89xx1
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorInfoAllcodeFn: () => dispatch(actions.fetchDoctorInfoAllcodeFn()), //v89xx1
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
