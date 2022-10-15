import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './section/HomeHeader';
import Speciality from './section/Speciality';
import MedicalFacility from './section/MedicalFacility';
import Doctors from './section/Doctors';
import Handbook from './section/Handbook';
import About from './section/About';
import HomeFooter from './section/HomeFooter';

//src19
class HomePage extends Component {
  render() {
    const settings = {
      infinite: false, //22ms16ss
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    return (
      // 32ms21ss
      <>
        <HomeHeader />
        <Speciality settings={settings} />
        <MedicalFacility settings={settings} />
        <Doctors settings={settings} />
        <Handbook
          settings={{ ...settings, slidesToShow: 2, slidesToScroll: 1 }}
        />
        <About />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);