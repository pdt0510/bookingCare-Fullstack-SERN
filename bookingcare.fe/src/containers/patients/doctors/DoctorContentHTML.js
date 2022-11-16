import React, { Component } from 'react';
import './DoctorContentHTML.scss';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

//src25
class DoctorDetail extends Component {
  state = {
    doctorId: null,
    contentHTML: null,
  };

  componentDidMount = async () => {
    const { doctorId, getDoctorContentHtmlFn } = this.props;
    const data = await getDoctorContentHtmlFn(doctorId); //v92xx1

    if (data.errCode === 0 && this.state.contentHTML === null) {
      this.setState({
        doctorId: doctorId,
        contentHTML: this.handleContentHTML(data.user.contentHTML),
      });
    }
  };

  handleContentHTML = (contentHTML) => {
    if (contentHTML) {
      return <span dangerouslySetInnerHTML={{ __html: contentHTML }} />;
    }
    return <span>No content</span>;
  };

  render() {
    return (
      <div className='doctorDetail-contentHtml-bgr'>
        <div className='doctorDetail-contentHtml container'>
          {this.state.contentHTML}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  getDoctorContentHtmlFn: (doctorId) =>
    dispatch(actions.getDoctorContentHtmlFn(doctorId)), //v92xx1
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
