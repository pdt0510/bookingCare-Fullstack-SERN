import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctors.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { homepageLangs } from '../../../connectSupplyFE/otherSupplies';
import { path } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class Doctors extends Component {
  componentDidMount = async () => {
    const { loadingTopDoctorHome } = this.props;
    await loadingTopDoctorHome();
  };

  navToDoctorDetailPage = (id) => {
    const { history } = this.props;
    const { doctorDetailPage } = path;
    history.push(doctorDetailPage + id);
  };

  renderTopDoctorHome = (dataArr) => {
    const { language } = this.props;

    return dataArr.map((item) => {
      const { id, firstName, lastName, positionData, avatar } = item;
      let base64Img = '';
      let doctor = '';

      if (language === LANGUAGES.EN) {
        doctor = `${positionData.valueEN}, ${firstName} ${lastName} `;
      } else {
        doctor = `${positionData.valueVI}, ${lastName} ${firstName}`;
      }

      if (avatar !== null) {
        base64Img = new Buffer.from(avatar).toString('binary');
      }

      return (
        <div
          key={id}
          className='section-blocks doctor-block'
          onClick={() => this.navToDoctorDetailPage(id)}
        >
          <div
            className='doctor-pics'
            style={{ backgroundImage: `url(${base64Img})` }}
          ></div>
          <div className='section-content-text'>{doctor}</div>
          Da liễu
        </div>
      );
    });
  };

  render() {
    const { topDoctorList } = this.props;
    const { outStandingDoctor, search } = homepageLangs;

    return (
      <div className='container-section'>
        <div className='section-content'>
          <div className='section-title'>
            <span className='section-title-text'>
              <FormattedMessage id={outStandingDoctor} />
            </span>
            <span className='section-moreBtn'>
              <FormattedMessage id={search} />
            </span>
          </div>
          <div className='section-body doctor-section-body'>
            <Slider {...this.props.settings}>
              {topDoctorList &&
                topDoctorList.length > 0 &&
                this.renderTopDoctorHome(topDoctorList)}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  topDoctorList: state.admin.topDoctorList,
});

const mapDispatchToProps = (dispatch) => ({
  loadingTopDoctorHome: (limit) =>
    dispatch(actions.fetchTopDoctorHomeFn(limit)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Doctors);
