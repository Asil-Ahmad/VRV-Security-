import React from "react";
import Lottie from "lottie-react";
import { ring } from "ldrs";
import { usercreated } from "../assets/images";

ring.register();
const Loader = () => {
  return (
    <Lottie
      animationData={usercreated}
      loop={false}
      className=' text-center sm:w-1/2 m-auto h-[70vh]   '
      title='List All Users'
    />
  );
};

export default Loader;
