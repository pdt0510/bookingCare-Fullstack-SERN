import React, { Component } from 'react';
import { Watch } from 'react-loader-spinner';
import './LoadingSymbol.scss';

//src28, 1h24ms45ss
class LoadingSymbol extends Component {
  render() {
    return (
      <span className='active-loading-symbol'>
        <Watch
          height='60'
          width='60'
          radius='48'
          color='#4fa94d'
          ariaLabel='watch-loading'
          wrapperStyle={{}}
          wrapperClassName=''
          visible={true}
        />
      </span>
    );
  }
}

export default LoadingSymbol;
