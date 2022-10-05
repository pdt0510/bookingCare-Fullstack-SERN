import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Specialty extends Component {
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    return (
      <>
        <div className='specialty-content'>
          <div className='specialty-title'>
            <h3 className='specialty-title-text'>Chuyên khoa phổ biến</h3>
            <span className='specialty-seeMore'>Xem thêm</span>
          </div>
          <div className='specialty-body'>
            <Slider {...settings}>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic1'></div>
                <div className='specialty-content-text'>Cơ xương khớp</div>
              </div>

              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic2'></div>
                <div className='specialty-content-text'>Thần kinh</div>
              </div>

              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic3'></div>
                <div className='specialty-content-text'>Tiêu hóa</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic4'></div>
                <div className='specialty-content-text'>Tim mạch</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic5'></div>
                <div className='specialty-content-text'>Tai mũi họng</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic6'></div>
                <div className='specialty-content-text'>Cột sống</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic7'></div>
                <div className='specialty-content-text'>Y học cố truyền</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic8'></div>
                <div className='specialty-content-text'>Châm cứu</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic9'></div>
                <div className='specialty-content-text'>Sản phụ khoa</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic10'></div>
                <div className='specialty-content-text'>Siêu âm thai</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic11'></div>
                <div className='specialty-content-text'>Nhi khoa</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic12'></div>
                <div className='specialty-content-text'>Da liễu</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic13'></div>
                <div className='specialty-content-text'>Bệnh viêm gan</div>
              </div>
              <div href='##' className='specialty-blocks'>
                <div className='specialty-content-pics specialty-content-pic14'></div>
                <div className='specialty-content-text'>Sức khỏe tâm thần</div>
              </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return;
};

const mapDispatchToProps = (dispatch) => {
  return;
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
