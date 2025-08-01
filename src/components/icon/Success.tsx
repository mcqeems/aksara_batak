import React from 'react';
import Lottie from 'lottie-react';
import successAlert from '/assets/json-lottie/success.json?url';

function Success() {
  return <Lottie animationData={successAlert} loop={false}></Lottie>;
}

export default Success;
