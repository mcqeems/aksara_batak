import Lottie from 'lottie-react';
import React from 'react';
import huggingFace from '../../../public/assets/json-lottie/hug-face.json';

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
