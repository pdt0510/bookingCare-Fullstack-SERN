import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorIntro.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { bookingModalLangs } from '../../../connectSupplyFE/otherSupplies';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { path } from './../../../utils/constant';

class DoctorIntro extends Component {
  state = {
    doctorId: null,
    avatar: null,
    fullname: null,
    description: null,

    firstName: null,
    lastName: null,
    positionData: null,
  };

  componentDidMount = async () => {
    const { getDoctorIntroFn, doctorId } = this.props;
    const data = await getDoctorIntroFn(doctorId);

    if (data.errCode === 0 && this.state.avatar === null) {
      const { avatar, doctorMarkdown, firstName, lastName, positionData } =
        data.user;

      this.setState({
        doctorId: doctorId,
        avatar: this.bufferToBase64String(avatar),
        fullname: this.handleFullname(firstName, lastName, positionData),
        description: this.handleDescription(doctorMarkdown.description),
        firstName: firstName,
        lastName: lastName,
        positionData: positionData,
      });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { language } = this.props;
    if (this.state.avatar && prevProps.language !== language) {
      const { firstName, lastName, positionData } = this.state;

      this.setState({
        fullname: this.handleFullname(firstName, lastName, positionData),
      });
    }
  };

  bufferToBase64String = (avatar) => {
    return new Buffer.from(avatar).toString('binary');
  };

  handleFullname = (firstName, lastName, positionData) => {
    const { language } = this.props;

    if (language === LANGUAGES.EN) {
      return `${positionData.valueEN}, ${firstName} ${lastName}`;
    } else {
      return `${positionData.valueVI}, ${lastName} ${firstName}`;
    }
  };

  handleDescription = (desc) => {
    if (desc) {
      const htmlString = desc.replaceAll('\n', '<br/>');
      return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
    }
    return <span>No descriptions</span>;
  };

  renderBookingInfo = (info) => {
    if (info) {
      const { date, schedule, price } = info;
      const { priceL, bookingFreeL } = bookingModalLangs;

      return (
        <>
          <FormattedMessage id={bookingFreeL} />
          <span className='bookingInfo'>
            {schedule}, {date}
          </span>
          <br />
          <FormattedMessage id={priceL} />
          <span className='bookingInfo'>{price}</span>
          <br />
        </>
      );
    }
  };

  render() {
    const { avatar, fullname, description } = this.state;
    const { introBookingInfo, seeDoctorDetail, doctorId } = this.props;

    return (
      <div className='doctorIntro-content container'>
        <div className='doctorIntro-intro'>
          <div className='doctorIntro-left'>
            <div
              className='intro-avatar'
              style={
                avatar && {
                  backgroundImage: `url(${avatar})`,
                }
              }
            >
              {seeDoctorDetail && (
                <Link
                  to={path.DOCTOR_DETAIL_PAGE + doctorId} // 33ms30ss
                  className='doctorIntro-seeMore'
                >
                  See details
                </Link>
              )}
            </div>
          </div>
          <div className='doctorIntro-right'>
            <div className='intro-header'>
              <span>{fullname}</span> <br />
            </div>
            <div className='intro-content'>
              {introBookingInfo
                ? this.renderBookingInfo(introBookingInfo)
                : description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  getDoctorIntroFn: (doctorId) => dispatch(actions.getDoctorIntroFn(doctorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorIntro);
