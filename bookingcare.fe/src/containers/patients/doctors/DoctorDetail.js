import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorDetail.scss';
import HomeHeader from '../../homePage/section/HomeHeader';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

//src21, 5ms02ss
class DoctorDetail extends Component {
  state = {
    avatar: null,
    contentHTML: null,
    contentMarkdown: null,
    description: null,
    fullname: null,
  };

  //42ms59ss
  componentDidMount = async () => {
    const { match } = this.props;
    const doctorId = +match.params.id;
    await this.props.getDoctorInfoByIdFn(doctorId);
  };

  // 42ms59ss
  componentDidUpdate = async (prevProps, prevState) => {
    const { doctorDetails, language } = this.props;
    // console.log('doctorDetails ---', doctorDetails);

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

  // 51ms40ss
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
    // way 2
    const { description } = this.props.doctorDetails.doctorInfo;
    if (description) {
      const htmlString = description.replaceAll('\n', '<br/>');
      return <span dangerouslySetInnerHTML={{ __html: htmlString }} />; // v78xx1
    }
    return <span>No descriptions</span>;

    //way 1
    // const stringToArr = description.split('\n');
    // return stringToArr.map((item, idx) => {
    //   return (
    //     <>
    //       <span key={idx}>{item}</span> <br />
    //     </>
    //   );
    // });
  };

  handleContentHTML = () => {
    const { doctorInfo } = this.props.doctorDetails;
    // console.log('doctorInfo ---', doctorInfo); // 50ms01ss

    if (doctorInfo.contentHTML) {
      return (
        <span dangerouslySetInnerHTML={{ __html: doctorInfo.contentHTML }} /> // v78xx1
      );
    }
    return <span>No content</span>;
  };

  render() {
    // const convertedId = Number(this.props.match.params.id); //23ms18ss
    const { avatar, fullname, contentHTML, description } = this.state;

    return (
      <>
        {/* v79xx3 */}
        <div className='doctorDetail-header-bgr'>
          <HomeHeader />
        </div>
        {/* 29ms22ss */}
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
  doctorDetails: state.admin.doctorInfo, //42ms59ss
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  getDoctorInfoByIdFn: (doctorId) =>
    dispatch(actions.fetchDoctorInfoByIdFn(doctorId)), //42ms59ss
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
