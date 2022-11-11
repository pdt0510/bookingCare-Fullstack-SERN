import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className='section-bgr'>
          <div className='container-section'>
            <div className='section-content'>
              <div className='homeFooter-content'> 
                <div className='homeFooter-left'>
                  <div className='homeFooter-left-icon'></div>
                  <div className='homeFooter-left-text'>
                    <div className='left-text-company'>
                      Công ty Cổ phần Công nghệ BookingCare
                    </div>
                    <div className='left-text-address'>
                      <i className='fas fa-map-marker-alt text-address-icon'></i>
                      28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                    </div>
                    <div className='left-text-created'>
                      <i className='fas fa-check left-created-icon'></i>
                      ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                    </div>
                  </div>
                  <div className='homeFooter-left-label'></div>
                  <div className='homeFooter-left-label'></div>
                </div>
                <div className='homeFooter-mid'>
                  <a
                    href='https://bookingcare.vn/hop-tac-voi-bookingcare'
                    className='homeFooter-mid-link'
                  >
                    Liên hệ hợp tác
                  </a>
                  <a
                    href='https://bookingcare.vn/goi-chuyen-doi-so'
                    className='homeFooter-mid-link'
                  >
                    Gói chuyển đổi số doanh nghiệp
                  </a>
                  <a
                    href='https://bookingcare.vn/tuyen-dung'
                    className='homeFooter-mid-link'
                  >
                    Tuyển dụng
                  </a>
                  <a
                    href='https://bookingcare.vn/hop-tac-voi-bookingcare'
                    className='homeFooter-mid-link'
                  >
                    Liên hệ hợp tác
                  </a>
                  <a
                    href='https://bookingcare.vn/goi-chuyen-doi-so'
                    className='homeFooter-mid-link'
                  >
                    Gói chuyển đổi số doanh nghiệp
                  </a>
                  <a
                    href='https://bookingcare.vn/tuyen-dung'
                    className='homeFooter-mid-link'
                  >
                    Tuyển dụng
                  </a>
                  <a
                    href='https://bookingcare.vn/goi-chuyen-doi-so'
                    className='homeFooter-mid-link'
                  >
                    Gói chuyển đổi số doanh nghiệp
                  </a>
                  <a
                    href='https://bookingcare.vn/tuyen-dung'
                    className='homeFooter-mid-link'
                  >
                    Tuyển dụng
                  </a>
                </div>
                <div className='homeFooter-right'>
                  <div className='homeFooter-right-text'>
                    <div className='right-text-title'>Trụ sở tại Hà Nội</div>
                    <div className='right-text-address'>
                      28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                    </div>
                  </div>
                  <div className='homeFooter-right-text'>
                    <div className='right-text-title'>
                      Văn phòng tại TP Hồ Chí Minh
                    </div>
                    <div className='right-text-address'>
                      Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                    </div>
                  </div>
                  <div className='homeFooter-right-text'>
                    <div className='right-text-title'>Hỗ trợ khách hàng</div>
                    <div className='right-text-address'>
                      support@bookingcare.vn (7h - 18h)
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className='homeFooter-app'>
                <i className='fas fa-mobile-alt homeFooter-app-icon'></i>
                Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
                <a
                  href='https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare'
                  className='homeFooter-app-link'
                >
                  {' '}
                  Android -
                </a>
                <a
                  href='https://apps.apple.com/vn/app/bookingcare/id1347700144'
                  className='homeFooter-app-link'
                >
                  {' '}
                  iPhone/iPad -
                </a>
                <a
                  href='https://bookingcare.vn/app'
                  className='homeFooter-app-link'
                >
                  {' '}
                  Khác
                </a>
                <a href='##' className='homeFooter-app-link'>
                  <h4>© 2022 BookingCare.</h4>
                </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
