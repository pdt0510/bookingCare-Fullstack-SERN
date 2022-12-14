import { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './DetailSpeciality.scss';
import DoctorIntro from './../doctors/DoctorIntro';
import DoctorExtraInfo from './../doctors/DoctorExtraInfo';
import DoctorSchedule from './../doctors/DoctorSchedule';
import HomeHeader from '../../homePage/section/HomeHeader';
import { getDoctorBySpecialityIdServ } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { DETAIL_SPECIALITY_DEFAULTS, LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import CommonUtils from './../../../utils/CommonUtils';

class DetailSpeciality extends Component {
  state = {
    img: null,
    htmlDesc: null,
    doctorOpt: [],
    seeMoreSpeciality: false,
    seeDoctorDetail: true,
    provinceSelected: DETAIL_SPECIALITY_DEFAULTS.provinceKey.toanQuoc,
  };

  componentDidMount = async () => {
    const idSpeciality = +this.props.match.params.id;
    if (idSpeciality && typeof idSpeciality === 'number') {
      const data = await getDoctorBySpecialityIdServ(idSpeciality);

      if (data.errCode === 0) {
        await this.props.fetchDoctorInfoAllcodeFn();
        const info = this.filterSpecialityDetails(data.records);
        const doctorId = info.tempDoctorList[0].doctorId;

        this.setState({
          img: CommonUtils.convertBinaryToString(info.tempImg),
          htmlDesc: info.tempHtmlDesc,
          doctorOpt: doctorId ? info.tempDoctorList : null,
        });
      }
    } else {
    }
  };

  filterSpecialityDetails = (list) => {
    let tempDoctorList = [];
    let tempImg = null;
    let tempHtmlDesc = null;

    list.map((item) => {
      const { htmlDesc, image, specialityData } = item;

      tempDoctorList.push(specialityData);
      if (tempImg === null) {
        tempImg = image;
      }
      if (tempHtmlDesc === null) {
        tempHtmlDesc = htmlDesc;
      }
      return null;
    });

    return {
      tempDoctorList,
      tempImg,
      tempHtmlDesc,
    };
  };

  renderAllDoctorDetails = (list) => {
    const { toanQuoc } = DETAIL_SPECIALITY_DEFAULTS.provinceKey;
    const { provinceSelected, seeDoctorDetail } = this.state;
    const length = list.length;
    let tempDoctorList = [];

    for (let idx = 0; idx < length; idx++) {
      const { provinceId, doctorId } = list[idx];

      if (provinceSelected === toanQuoc || provinceSelected === provinceId) {
        tempDoctorList.push(
          <div key={idx} className='DetailSpeciality-doctor-section'>
            <div className='DetailSpeciality-doctor-intro'>
              <DoctorIntro
                doctorId={doctorId}
                seeDoctorDetail={seeDoctorDetail}
              />
            </div>
            <div className='DetailSpeciality-doctor-extra'>
              <DoctorSchedule doctorId={doctorId} />
              <DoctorExtraInfo doctorId={doctorId} />
            </div>
          </div>,
        );
      }
    }

    return tempDoctorList;
  };

  renderHtmlString = (htmlStr) => {
    return <span dangerouslySetInnerHTML={{ __html: htmlStr }} />;
  };

  renderProvinceSelect = () => {
    const { HCM, HN, toanQuoc } = DETAIL_SPECIALITY_DEFAULTS.provinceKey;
    const { provinceList, language } = this.props;
    const length = provinceList.length;
    let options = [];

    for (let idx = 0; idx < length; idx++) {
      if (options.length === 0) {
        options.push(
          <option key={idx} value={toanQuoc} defaultValue>
            {language === LANGUAGES.EN ? 'Whole nation' : 'Toa??n qu????c'}
          </option>,
        );
      }

      if (provinceList[idx].keymap === HCM || provinceList[idx].keymap === HN) {
        options.push(
          <option key={idx + 1} value={provinceList[idx].keymap}>
            {language === LANGUAGES.EN
              ? provinceList[idx].valueEN
              : provinceList[idx].valueVI}
          </option>,
        );

        if (options.length === 3) {
          break;
        }
      }
    }

    return (
      <select className='form-control' onChange={this.handleSelect}>
        {options}
      </select>
    );
  };

  handleSelect = (event) => {
    this.setState({
      provinceSelected: event.target.value,
    });
  };

  showSeeMore = () => {
    this.setState({
      seeMoreSpeciality: !this.state.seeMoreSpeciality,
    });
  };

  render() {
    const { htmlDesc, doctorOpt, seeMoreSpeciality } = this.state;

    return (
      <div className='DetailSpeciality-content'>
        <HomeHeader />
        <div
          className={`DetailSpeciality-speciality-info container
           ${seeMoreSpeciality && 'seeMoreSpeciality'}`}
        >
          {htmlDesc && this.renderHtmlString(htmlDesc)}
        </div>
        <span
          className='DetailSpeciality-seeMore container'
          onClick={this.showSeeMore}
        >
          {seeMoreSpeciality ? 'Hide less' : 'See more'}
        </span>
        <div className='DetailSpeciality-section-bgr'>
          <div className='DetailSpeciality-doctor container'>
            <div className='DetailSpeciality-area'>
              {this.renderProvinceSelect()}
            </div>
            {doctorOpt && this.renderAllDoctorDetails(doctorOpt)}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
  provinceList: state.admin.provinceList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorInfoAllcodeFn: () => dispatch(actions.fetchDoctorInfoAllcodeFn()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(DetailSpeciality);
