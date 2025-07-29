import Lottie from 'lottie-react';
import React from 'react';
import huggingFace from '../../../public/assets/json-lottie/hug-face.json';

interface EmojiHuggingFaceProps {
  className?: string;
}

function EmojiHunggingFace({ className }: EmojiHuggingFaceProps) {
  return (
    <Lottie
      animationData={huggingFace}
      loop={true}
      className={`h-[250px] ${className}`}
    ></Lottie>
  );
}

export default EmojiHunggingFace;
