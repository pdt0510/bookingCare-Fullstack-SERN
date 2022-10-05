import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';

class About extends Component {
  render() {
    return (
      <>
        <div className='container-section'>
          <div className='section-content'>
            <div className='section-title'>
              <span className='section-title-text'>
                Truyền thông nói về BookingCare
              </span>
            </div>
            <div className='section-body'>
              <div className='about-content'>
                <div className='about-left'>
                  <iframe
                    width='100%'
                    height='410px'
                    src='https://www.youtube.com/embed/FyDQljKtWnI'
                    title='CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
                <div className='about-right'>
                  <div className='px-5'>
                    <a
                      href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                      className='about-link about-pic1'
                    >
                      {' '}
                    </a>
                    <a
                      href='https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm'
                      className='about-link about-pic2'
                    >
                      {' '}
                    </a>
                    <a
                      href='https://ictnews.vietnamnet.vn/'
                      className='about-link about-pic3'
                    >
                      {' '}
                    </a>
                  </div>
                  <div className=''>
                    <a
                      href='https://vnexpress.net/thi-diem-dat-lich-kham-chua-benh-truc-tuyen-4267383.html'
                      className='about-link about-pic4'
                    >
                      {' '}
                    </a>
                    <a
                      href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                      className='about-link about-pic8'
                    >
                      {' '}
                    </a>
                    <a
                      href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                      className='about-link about-pic5'
                    >
                      {' '}
                    </a>
                  </div>
                  <div className='px-4'>
                    <a
                      href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                      className='about-link about-pic6'
                    >
                      {' '}
                    </a>
                    <a
                      href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                      className='about-link about-pic2'
                    >
                      {' '}
                    </a>
                    <a
                      href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                      className='about-link about-pic7'
                    >
                      {' '}
                    </a>
                    <a
                      href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                      className='about-link about-pic2'
                    >
                      {' '}
                    </a>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
