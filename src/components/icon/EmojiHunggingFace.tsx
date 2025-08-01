import React from 'react';
import Lottie from 'lottie-react';
import huggingFace from '../../assets/json-lottie/hug-face.json';

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
