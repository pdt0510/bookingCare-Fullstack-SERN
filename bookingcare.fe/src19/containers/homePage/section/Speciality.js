import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Speciality.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';
import { homepageLangs } from '../../../connectSupplyFE/otherSupplies';

class Speciality extends Component {
  render() {
    const { commonSpecialities, seeMore } = homepageLangs;

    return (
      <>
        <div className='container-section'>
          <div className='section-content'>
            <div className='section-title'>
              <span className='section-title-text'>
                <FormattedMessage id={commonSpecialities} />
              </span>
              <span className='section-moreBtn'>
                <FormattedMessage id={seeMore} />
              </span>
            </div>
            <div className='section-body'>
              <Slider {...this.props.settings}>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic1'></div>
                  <div className='section-content-text'>Cơ xương khớp</div>
                </div>

                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic2'></div>
                  <div className='section-content-text'>Thần kinh</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic3'></div>
                  <div className='section-content-text'>Tiêu hóa</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic4'></div>
                  <div className='section-content-text'>Tim mạch</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic5'></div>
                  <div className='section-content-text'>Tai mũi họng</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic6'></div>
                  <div className='section-content-text'>Cột sống</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic7'></div>
                  <div className='section-content-text'>Y học cố truyền</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic8'></div>
                  <div className='section-content-text'>Châm cứu</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic9'></div>
                  <div className='section-content-text'>Sản phụ khoa</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic10'></div>
                  <div className='section-content-text'>Siêu âm thai</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic11'></div>
                  <div className='section-content-text'>Nhi khoa</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic12'></div>
                  <div className='section-content-text'>Da liễu</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic13'></div>
                  <div className='section-content-text'>Bệnh viêm gan</div>
                </div>
                <div href='##' className='section-blocks'>
                  <div className='section-content-pics speciality-pic14'></div>
                  <div className='section-content-text'>Sức khỏe tâm thần</div>
                </div>
              </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
