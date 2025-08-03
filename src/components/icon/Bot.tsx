import Lottie from 'lottie-react';
import React from 'react';
import myBot from '../../../public/assets/json-lottie/bot.json';

interface ClassName {
  className: string;
}

function Bot({ className }: ClassName) {
  return (
    <Lottie
      animationData={myBot}
      loop={true}
      className={`${className} + h-[250px]`}
    ></Lottie>
  );
}

export default Bot;
