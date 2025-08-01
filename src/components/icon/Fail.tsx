import React from 'react';
import Lottie from 'lottie-react';
import failAlert from '../../assets/json-lottie/failed.json';

function Fail() {
  return <Lottie animationData={failAlert} loop={false}></Lottie>;
}

export default Fail;
