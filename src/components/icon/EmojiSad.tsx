import Lottie from 'lottie-react';
import React from 'react';
import sad from '../../../public/assets/json-lottie/happy-cry.json';

function EmojiSad() {
  return (
    <Lottie animationData={sad} loop={true} className="h-[250px]"></Lottie>
  );
}

export default EmojiSad;
