import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialitiesComp.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';
import { homepageLangs } from '../../../connectSupplyFE/otherSupplies';
import { getAllSpecialitiesServ } from '../../../services/userService';
import { CommonUtils } from '../../../utils';
import { path } from './../../../utils/constant';
import { withRouter } from 'react-router';
import { compose } from 'redux';

//src27, v101xx1
class SpecialitiesComp extends Component {
  state = {
    users: [],
  };

  componentDidMount = async () => {
    const data = await getAllSpecialitiesServ(); //13ms45ss
    if (data.errCode === 0) {
      const userList = await this.convertImgToBinaryStr(data.users);
      this.setState({
        users: userList,
      });
    }
  };

  convertImgToBinaryStr = async (list) => {
    const tempList = await list.map((item) => {
      return {
        ...item,
        image: CommonUtils.convertBase64ToBinary(item.image),
      };
    });

    return tempList;
  };

  // 51ms54ss
  navToSpecialityDetailPage = (id) => {
    const { history } = this.props;
    const redirectLink = path.DETAIL_SPECIALITY_PAGE + id;
    history.push(redirectLink);
  };

  //13ms45ss
  renderSpecialities = () => {
    return this.state.users.map((item, idx) => {
      return (
        <div
          key={idx}
          className='section-blocks'
          onClick={() => this.navToSpecialityDetailPage(item.id)} //51ms54ss
        >
          <div
            className='section-content-pics'
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          <div className='section-content-text'>{item.name}</div>
        </div>
      );
    });
  };

  render() {
    const { commonSpecialities, seeMore } = homepageLangs;
    const { users } = this.state;

    return (
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
              {
                users && users.length > 0 && this.renderSpecialities() //13ms45ss
              }
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SpecialitiesComp);

// export default connect(mapStateToProps, mapDispatchToProps)(SpecialitiesComp);
