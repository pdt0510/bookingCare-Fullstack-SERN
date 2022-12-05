import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';
import { homepageLangs } from '../../../connectSupplyFE/otherSupplies';
import { getAllClinicsServ } from './../../../services/userService';
import CommonUtils from './../../../utils/CommonUtils';
import { Link } from 'react-router-dom';
import { path } from './../../../utils/constant';

class MedicalFacility extends Component {
  state = {
    facilityList: null,
  };

  componentDidMount = async () => {
    const data = await getAllClinicsServ(); //2ms15ss

    if (data.errCode === 0) {
      this.setState({
        facilityList: await this.filterDataToState(data.records),
      });
    }
  };

  filterDataToState = async (list) => {
    const tempList = await list.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: CommonUtils.convertBinaryToString(item.image),
      };
    });

    return tempList;
  };

  // 2ms15ss
  renderAllClinics = () => {
    const redirectLink = path.DETAIL_CLINIC_PAGE;

    return this.state.facilityList.map((item) => {
      return (
        <div className='section-blocks' key={item.id}>
          <Link
            to={redirectLink + item.id} //v105xx2, 20ms45ss
            className='section-link'
          >
            <div
              className='section-content-pics medical-pic-size'
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className='section-content-text'>{item.name}</div>
          </Link>
        </div>
      );
    });
  };

  render() {
    const { outStandingMedicalFacilities, search } = homepageLangs;
    const { facilityList } = this.state;

    return (
      <>
        <div className='section-bgr'>
          <div className='container-section'>
            <div className='section-content'>
              <div className='section-title'>
                <span className='section-title-text'>
                  <FormattedMessage id={outStandingMedicalFacilities} />
                </span>
                <span className='section-moreBtn'>
                  <FormattedMessage id={search} />
                </span>
              </div>
              <div className='section-body'>
                <Slider {...this.props.settings}>
                  {facilityList &&
                    facilityList.length > 0 &&
                    this.renderAllClinics()}
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
