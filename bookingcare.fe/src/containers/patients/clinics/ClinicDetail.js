import { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './ClinicDetail.scss';
import DoctorIntro from '../doctors/DoctorIntro';
import DoctorExtraInfo from '../doctors/DoctorExtraInfo';
import DoctorSchedule from '../doctors/DoctorSchedule';
import HomeHeader from '../../homePage/section/HomeHeader';
import {
  getClinicByIdServ,
  getDoctorBySpecialityIdServ,
} from '../../../services/userService';
import * as actions from '../../../store/actions';
import { DETAIL_SPECIALITY_DEFAULTS, LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import CommonUtils from '../../../utils/CommonUtils';

//src28, 20ms45ss
class ClinicDetail extends Component {
  state = {
    img: null,
    name: null,
    descText: null,
    doctorOpt: [],
  };

  componentDidMount = async () => {
    const clinicId = +this.props.match.params.id;
    if (clinicId && typeof clinicId === 'number') {
      const data = await getClinicByIdServ(clinicId); //v106xx3

      if (data.errCode === 0) {
        const { htmlDesc, address, name } = data.records;
        const textContent = CommonUtils.convertHtmlStrToText(htmlDesc);

        this.setState({
          name,
          descText: textContent,
          address,
        });
      }
    }
  };

  render() {
    const { name, descText, address } = this.state;

    // v106xx3
    return (
      <div className='clinicDetail-content'>
        <h3>{name}</h3>
        {address}
        {descText}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorInfoAllcodeFn: () => dispatch(actions.fetchDoctorInfoAllcodeFn()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ClinicDetail);
