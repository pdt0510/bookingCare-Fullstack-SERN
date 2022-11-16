import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorDetail.scss';
import HomeHeader from '../../homePage/section/HomeHeader';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import DoctorIntro from './DoctorIntro';
import DoctorContentHTML from './DoctorContentHTML';

//src25
class DoctorDetail extends Component {
  state = {
    doctorId: null,
    contentHTML: null,
    contentMarkdown: null,
  };

  componentDidMount = async () => {
    const { match } = this.props;
    const doctorId = +match.params.id;

    if (doctorId) {
      this.setState({
        doctorId: doctorId,
      });
    }
  };

  render() {
    const { doctorId } = this.state;

    return (
      <>
        <div className='doctorDetail-header-bgr'>
          <HomeHeader />
        </div>

        {/* v92xx2 */}
        {doctorId && <DoctorIntro doctorId={doctorId} />}

        {/* 1m39ss */}
        <div className='doctorDetail-body container'>
          {doctorId && <DoctorSchedule doctorId={doctorId} />}
          {doctorId && <DoctorExtraInfo doctorId={doctorId} />}
        </div>

        {/* v92xx1 */}
        {doctorId && <DoctorContentHTML doctorId={doctorId} />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
