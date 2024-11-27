import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import {
  adduser,
  listuser,
  manageroles,
  shield,
  yellowline,
} from "../assets/images";
import { ShopContext } from "../context/ShopContext";

const Dashboard = () => {
  const { navigate, username } = useContext(ShopContext);
  const [play, setPlay] = useState(false);
  return (
    <section className='max-h-screen m-auto lg:px-20 px-2'>
      <Lottie
        animationData={yellowline}
        className='w-96 -z-50  absolute top-[10%] right-[17%] rotate-[50deg]'
        title='Manage Roles'
      />
      <div className='flex justify-between items-center'>
        <div className='sm:w-1/2 w-full flex flex-col justify-center h-full sm:py-12 py-2 '>
          <h1 className='py-5 z-10 sm:text-4xl text-2xl font-poppins font-light'>
            Hi, {username}
          </h1>
          <h2 className='sm:block hidden sm:text-3xl text-xl text-gray-400 font-poppins font-[100]'>
            Your VRV Security Admin Center account has been created{" "}
          </h2>
        </div>

        <h1 className='text-[10rem] text-center flex-1 font-extrabold text-[#059669]/40 sm:block hidden'>
          VRV
        </h1>
      </div>

      <div className=''>
        <p className=' font-poppins text-md text-[#059669] pb-1'>
          User Management & Security Tools
        </p>
        <div className='grid lg:grid-cols-4 grid-cols-2 lg:grid-rows-1 grid-rows-2 gap-4 font-light font-poppins text-gray-400 text-md pb-5'>
          <div
            className=' flex flex-col justify-between items-center hover:scale-105 rounded-xl  hover:shadow-2xl duration-300'
            onClick={() => navigate("/create_employee")}
          >
            <Lottie
              animationData={adduser}
              loop={play}
              className='sm:w-72  hover:scale-105 duration-150'
              title='Add New User'
            />
            <p className='text-center sm:text-xl text-md pb-2'>Add New User</p>
          </div>
          <div
            className=' flex flex-col justify-between items-center hover:scale-105 hover:shadow-2xl rounded-xl  duration-300'
            onClick={() => navigate("/employee_list")}
          >
            <Lottie
              animationData={listuser}
              loop={play}
              className='sm:w-72   hover:scale-105 duration-150'
              title='List All Users'
            />
            <p className='text-center sm:text-xl text-md pb-2'>List Users</p>
          </div>
          <div className=' flex flex-col justify-between items-center hover:scale-105 hover:shadow-2xl rounded-xl  duration-300'>
            <Lottie
              animationData={manageroles}
              loop={play}
              className='sm:w-72   hover:scale-105  duration-150'
              title='Manage Roles'
            />
            <p className='text-center sm:text-xl text-md pb-2'>Manage Roles</p>
          </div>
          <div className=' flex flex-col justify-between items-center hover:scale-105 hover:shadow-2xl rounded-xl duration-300'>
            <Lottie
              animationData={shield}
              loop={play}
              className='sm:w-72   hover:scale-105 duration-150'
              title='Manage Roles'
            />
            <p className='text-center sm:text-xl text-md pb-2'>Add User</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
