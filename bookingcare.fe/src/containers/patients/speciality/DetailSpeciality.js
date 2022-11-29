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

//src27, 50ms18ss
class DetailSpeciality extends Component {
  state = {
    img: null,
    htmlDesc: null,
    doctorOpt: [],
    isOpen: false,
    seeDoctorDetail: true,
    provinceSelected: DETAIL_SPECIALITY_DEFAULTS.provinceKey.toanQuoc,
  };

  componentDidMount = async () => {
    const idSpeciality = +this.props.match.params.id;
    if (idSpeciality && typeof idSpeciality === 'number') {
      const data = await getDoctorBySpecialityIdServ(idSpeciality); //12ms44ss

      if (data.errCode === 0) {
        await this.props.fetchDoctorInfoAllcodeFn();
        const info = this.filterSpecialityDetails(data.records);
        const doctorId = info.tempDoctorList[0].doctorId;

        this.setState({
          img: CommonUtils.convertBase64ToBinary(info.tempImg),
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
    const { provinceSelected, seeDoctorDetail } = this.state; //23ms51ss
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
                seeDoctorDetail={seeDoctorDetail} //33ms30ss
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

  // 23ms51ss
  renderProvinceSelect = () => {
    const { HCM, HN, toanQuoc } = DETAIL_SPECIALITY_DEFAULTS.provinceKey;
    const { provinceList, language } = this.props;
    const length = provinceList.length;
    let options = [];

    for (let idx = 0; idx < length; idx++) {
      if (options.length === 0) {
        options.push(
          <option key={idx} value={toanQuoc} defaultValue>
            {language === LANGUAGES.EN ? 'Whole nation' : 'Toàn quốc'}
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

  // v103xx1
  showSeeMore = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { htmlDesc, doctorOpt, isOpen, img } = this.state;

    // v102xx1
    return (
      <div className='DetailSpeciality-content'>
        <HomeHeader />
        <div
        // className='DetailSpeciality-bgrImg'
        // style={{ backgroundImage: `url(${img && img})` }} //v103xx2
        ></div>
        <div
          className={`DetailSpeciality-speciality-info container
           ${
             isOpen && 'open' // v103xx1
           }`}
        >
          {htmlDesc && this.renderHtmlString(htmlDesc)}
        </div>
        <a
          href='##'
          className='DetailSpeciality-seeMore container'
          onClick={this.showSeeMore}
        >
          {isOpen ? 'Hide less' : 'See more'}
        </a>
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
