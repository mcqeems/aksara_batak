import Lottie from 'lottie-react';
import React from 'react';
import grimacing from '../../../public/assets/json-lottie/grimacing.json';

function EmojiGrimacing() {
  return (
    <Lottie
      animationData={grimacing}
      loop={true}
      className="h-[250px]"
    ></Lottie>
  );
}

export default EmojiGrimacing;
