import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { doctorExtraInfoLangs } from '../../../connectSupplyFE/otherSupplies';
import CommonUtils from './../../../utils/CommonUtils';

//src25
class DoctorExtraInfo extends Component {
  state = {
    doctorPriceVI: null,
    doctorPriceUSD: null,
    clinicAddress: null,
    clinicName: null,
    openPriceTable: false,
  };

  componentDidMount = async () => {
    const { doctorId, fetchDoctorInfoAllcodeFn, getDoctorExtraInfoFn } =
      this.props;

    if (doctorId && typeof doctorId === 'number') {
      await fetchDoctorInfoAllcodeFn();
      const doctorExtra = await getDoctorExtraInfoFn(doctorId); //3ms03ss

      if (doctorExtra.data) {
        const { priceId, clinicAddress, clinicName } = doctorExtra.data;

        // 26ms18ss
        const doctorPrice = CommonUtils.formatCurrency(
          priceId,
          this.props.priceList,
        );

        this.setState({
          doctorPriceVI: doctorPrice.viCurrency,
          doctorPriceUSD: doctorPrice.dollarCurrency, // 26ms18ss
          clinicAddress,
          clinicName,
        });
      }
    }
  };

  getDoctorPriceByLangs = (addDot = true) => {
    let tempdoctorPrice = null;
    const { language } = this.props;
    const { doctorPriceUSD, doctorPriceVI } = this.state;

    if (language === LANGUAGES.EN) {
      tempdoctorPrice = (
        <>
          {doctorPriceUSD}
          <span className='currency-mark'>$</span>
          {addDot ? '. ' : null}
        </>
      );
    } else {
      tempdoctorPrice = (
        <>
          {doctorPriceVI}
          <span className='currency-mark'>đ</span>
          {addDot ? '. ' : null}
        </>
      );
    }
    return tempdoctorPrice;
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
              <FormattedMessage id={doctorExtraInfoLangs.priceL} />
            </h6>
            <h6>{this.getDoctorPriceByLangs(false)}</h6>
          </div>
          Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho
          người nước ngoài là 30 USD
        </span>
        <span className='price-table price-table-down'>
          Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt
          thẻ.
        </span>
      </div>
    );
  };

  render() {
    const { openPriceTable, clinicAddress, clinicName } = this.state;
    const { clinicAddressL, priceL, seeMoreL, hideTableL } =
      doctorExtraInfoLangs;

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
            {openPriceTable
              ? this.renderPriceTable()
              : this.getDoctorPriceByLangs()}

            <span
              className='DoctorExtraInfo-priceTable-label'
              onClick={() => this.toggleTable('openPriceTable', openPriceTable)}
            >
              {openPriceTable ? (
                <FormattedMessage id={hideTableL} />
              ) : (
                <FormattedMessage id={seeMoreL} />
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  priceList: state.admin.priceList,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  getDoctorExtraInfoFn: (doctorId) =>
    dispatch(actions.getDoctorExtraInfoFn(doctorId)), //3ms03ss
  fetchDoctorInfoAllcodeFn: () => dispatch(actions.fetchDoctorInfoAllcodeFn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
