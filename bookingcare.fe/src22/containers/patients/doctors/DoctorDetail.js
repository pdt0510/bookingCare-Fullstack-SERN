import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorDetail.scss';
import HomeHeader from '../../homePage/section/HomeHeader';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class DoctorDetail extends Component {
  state = {
    avatar: null,
    contentHTML: null,
    contentMarkdown: null,
    description: null,
    fullname: null,
  };

  componentDidMount = async () => {
    const { match } = this.props;
    const doctorId = +match.params.id;
    await this.props.fetchDoctorDetailByIdFn(doctorId);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { doctorDetails, language } = this.props;

    if (this.state.avatar === null && doctorDetails) {
      this.setState({
        avatar: this.bufferToBase64String(),
        fullname: this.handleFullname(),
        contentHTML: this.handleContentHTML(),
        description: this.handleDescription(),
      });
    } else if (this.state.avatar && prevProps.language !== language) {
      this.setState({
        fullname: this.handleFullname(),
      });
    }
  };

  bufferToBase64String = () => {
    const { avatar } = this.props.doctorDetails;
    return new Buffer.from(avatar).toString('binary');
  };

  handleFullname = () => {
    const { doctorDetails, language } = this.props;
    const { firstName, lastName, positionData } = doctorDetails;

    if (language === LANGUAGES.EN) {
      return `${positionData.valueEN}, ${firstName} ${lastName}`;
    } else {
      return `${positionData.valueVI}, ${lastName} ${firstName}`;
    }
  };

  handleDescription = () => {
    const { description } = this.props.doctorDetails.doctorDetails;
    if (description) {
      const htmlString = description.replaceAll('\n', '<br/>');
      return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
    }
    return <span>No descriptions</span>;
  };

  handleContentHTML = () => {
    const { doctorDetails } = this.props.doctorDetails;

    if (doctorDetails.contentHTML) {
      return (
        <span dangerouslySetInnerHTML={{ __html: doctorDetails.contentHTML }} />
      );
    }
    return <span>No content</span>;
  };

  render() {
    const { avatar, fullname, contentHTML, description } = this.state;

    return (
      <>
        <div className='doctorDetail-header-bgr'>
          <HomeHeader />
        </div>
        <div className='doctorDetail-content'>
          <div className='doctorDetail-intro container'>
            <div className='doctorDetail-intro-left'>
              <div
                className='intro-left-avatar'
                style={
                  avatar && {
                    backgroundImage: `url(${avatar})`,
                  }
                }
              ></div>
            </div>
            <div className='doctorDetail-intro-right'>
              <div className='intro-right-header'>
                <span>{fullname && fullname}</span>
              </div>
              <div className='intro-right-content'>
                {description && description}
              </div>
            </div>
          </div>
          <div className='doctorDetail-schedule container'>
            <h1>Doctor schedule</h1>
          </div>
          <div className='doctorDetail-detail-bgr'>
            <div className='doctorDetail-detail-content container'>
              {contentHTML && contentHTML}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  doctorDetails: state.admin.doctorDetails,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorDetailByIdFn: (doctorId) =>
    dispatch(actions.fetchDoctorDetailByIdFn(doctorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
