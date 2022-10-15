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

//src19
class Doctors extends Component {
  componentDidMount = async () => {
    const { loadingTopDoctorHome } = this.props;
    await loadingTopDoctorHome(); // 43ms51ss
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

      //1h11ms09ss
      if (avatar !== null) {
        base64Img = new Buffer.from(avatar).toString('binary');
      }

      return (
        <div key={id} href='##' className='section-blocks doctor-block'>
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
      <>
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
                {
                  // 43ms51ss
                  topDoctorList &&
                    topDoctorList.length > 0 &&
                    this.renderTopDoctorHome(topDoctorList)
                }

                {/* <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic1'></div>
                  <div className='section-content-text'>
                    Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                  </div>
                  Da liễu
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic2'></div>
                  <div className='section-content-text'>
                    Bác sĩ chuyên khoa II: Trần Thị Hoài Hương{' '}
                  </div>
                  Da liễu
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic3'></div>
                  <div className='section-content-text'>
                    Bác sĩ Chuyên khoa II Trần Minh Khuyên{' '}
                  </div>
                  Sức khỏe tâm thần: Tư vấn, trị liệu Tâm lý
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic4'></div>
                  <div className='section-content-text'>
                    Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội
                  </div>
                  Nam học
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic5'></div>
                  <div className='section-content-text'>
                    Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An
                  </div>
                  Tai Mũi Họng: Nhi khoa
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic6'></div>
                  <div className='section-content-text'>
                    PGS, TS, Giảng viên cao cấp Trần Hữu Bình
                  </div>
                  Sức khỏe tâm thần
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic7'></div>
                  <div className='section-content-text'>
                    Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Tuyết Xương
                  </div>
                  Tai Mũi Họng
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic8'></div>
                  <div className='section-content-text'>
                    Tiến sĩ, Bác sĩ Đỗ Phương Vịnh
                  </div>
                  Thần kinh
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic9'></div>
                  <div className='section-content-text'>
                    Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Trọng Hưng
                  </div>
                  Thần kinh
                </div>

                <div href='##' className='section-blocks doctor-block'>
                  <div className='doctor-pics doctor-pic10'></div>
                  <div className='section-content-text'>
                    Thạc sĩ, Bác sĩ Hứa Thúy Vi
                  </div>
                  Tiêu hóa: Bệnh Viêm gan
                </div> */}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  topDoctorList: state.admin.topDoctorList, //43ms51ss
});

const mapDispatchToProps = (dispatch) => ({
  loadingTopDoctorHome: (limit) => dispatch(actions.fetchTopDoctorHomeFn(limit)), //v72xx1, 43ms51ss
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
