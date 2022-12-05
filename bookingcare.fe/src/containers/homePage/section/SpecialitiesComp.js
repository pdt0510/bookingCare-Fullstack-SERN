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

class SpecialitiesComp extends Component {
  state = {
    users: [],
  };

  componentDidMount = async () => {
    const data = await getAllSpecialitiesServ();
    if (data.errCode === 0) {
      const userList = await this.filterAllDataToState(data.users);
      this.setState({
        users: userList,
      });
    }
  };

  filterAllDataToState = async (list) => {
    const tempList = await list.map((item) => {
      return {
        ...item,
        image: CommonUtils.convertBinaryToString(item.image),
      };
    });

    return tempList;
  };

  navToSpecialityDetailPage = (id) => {
    const { history } = this.props;
    const redirectLink = path.DETAIL_SPECIALITY_PAGE + id;
    history.push(redirectLink);
  };

  renderSpecialities = () => {
    return this.state.users.map((item, idx) => {
      return (
        <div
          key={idx}
          className='section-blocks'
          onClick={() => this.navToSpecialityDetailPage(item.id)}
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
              {users && users.length > 0 && this.renderSpecialities()}
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
