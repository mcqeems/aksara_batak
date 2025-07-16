import React from 'react';
import Lottie from 'lottie-react';
import successAlert from '../../../public/assets/json-lottie/success.json';

function Success() {
  return <Lottie animationData={successAlert} loop={false}></Lottie>;
}

export default Success;
