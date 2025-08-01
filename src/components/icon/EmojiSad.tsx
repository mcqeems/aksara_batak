import React from 'react';
import Lottie from 'lottie-react';
import sad from '/assets/json-lottie/happy-cry.json?url';

function EmojiSad() {
  return (
    <Lottie animationData={sad} loop={true} className="h-[250px]"></Lottie>
  );
}

export default EmojiSad;
