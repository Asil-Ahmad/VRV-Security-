import React from "react";

import { ring } from "ldrs";

ring.register();
const Loader = () => {
  return (
    <div className='container text-center content-center h-[50vh]'>
      <l-ring
        size='40'
        stroke='5'
        bg-opacity='0'
        speed='2'
        color='black'
      ></l-ring>
    </div>
  );
};

export default Loader;
