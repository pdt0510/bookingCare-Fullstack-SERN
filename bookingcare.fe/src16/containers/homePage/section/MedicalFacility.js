import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class MedicalFacility extends Component {
  render() {
    return (
      <>
        <div className='section-bgr'>
          <div className='container-section'>
            <div className='section-content'>
              <div className='section-title'>
                <span className='section-title-text'>Cơ sở y tế nổi bật</span>
                <span className='section-moreBtn'>Tìm kiếm</span>
              </div>
              <div className='section-body'>
                <Slider {...this.props.settings}>
                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic1'></div>
                    <div className='section-content-text'>
                      Bệnh viện Hữu nghị Việt Đức
                    </div>
                  </div>

                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic2'></div>
                    <div className='section-content-text'>
                      Bệnh viện Chợ Rẫy
                    </div>
                  </div>

                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic3'></div>
                    <div className='section-content-text'>
                      Phòng khám Bệnh viện Đại học Y Dược 1
                    </div>
                  </div>

                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic4'></div>
                    <div className='section-content-text'>
                      Bệnh viện K - Cơ sở Phan Chu Trinh
                    </div>
                  </div>

                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic5'></div>
                    <div className='section-content-text'>
                      Bệnh viện Ung bướu Hưng Việt
                    </div>
                  </div>

                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic6'></div>
                    <div className='section-content-text'>
                      Hệ thống Y tế Thu Cúc TCI
                    </div>
                  </div>

                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic7'></div>
                    <div className='section-content-text'>
                      Phòng khám Đa khoa Saigon Healthcare
                    </div>
                  </div>

                  <div href='##' className='section-blocks'>
                    <div className='section-content-pics medical-pic-size medical-pic8'></div>
                    <div className='section-content-text'>
                      Bệnh viện Nam học và Hiếm muộn Hà Nội
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
