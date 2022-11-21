import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorDetail.scss';
import HomeHeader from '../../homePage/section/HomeHeader';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import DoctorIntro from './DoctorIntro';
import DoctorContentHTML from './DoctorContentHTML';

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

        {doctorId && <DoctorIntro doctorId={doctorId} />}

        <div className='doctorDetail-body container'>
          {doctorId && <DoctorSchedule doctorId={doctorId} />}
          {doctorId && <DoctorExtraInfo doctorId={doctorId} />}
        </div>

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
