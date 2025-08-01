import React from 'react';
import Lottie from 'lottie-react';
import grimacing from '/assets/json-lottie/grimacing.json?url';

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
