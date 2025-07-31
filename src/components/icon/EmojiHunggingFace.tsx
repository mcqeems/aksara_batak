import React from 'react';
import Lottie from 'lottie-react';
import huggingFace from '/assets/json-lottie/hug-face.json?url';

function EmojiHunggingFace() {
  return (
    <Lottie
      animationData={huggingFace}
      loop={true}
      className="h-[250px]"
    ></Lottie>
  );
}

export default EmojiHunggingFace;
