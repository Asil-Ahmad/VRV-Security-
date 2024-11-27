import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { navlinks } from "../constant";
import { NavLink } from "react-router-dom";
import { logo } from "../assets/icons";
import {
  CircleHelpIcon,
  HamIcon,
  MenuIcon,
  Search,
  SearchIcon,
  SettingsIcon,
  UserCircle,
} from "lucide-react";

const Navbar = () => {
  const { username, navigate } = useContext(ShopContext);
  return (
    <header className='lg:px-20 px-2'>
      <nav className='sticky top-10 sm:py-5 py-2 w-full flex justify-between items-center '>
        <div
          onClick={() => navigate("/dashboard")}
          className='flex gap-2 items-center cursor-pointer'
        >
          <img src={logo} alt='' className='w-12 rounded' />
          <h1 className='font-poppins sm:text-xl text-md font-medium'>
            VRV {""}
            <span className='font-light text-gray-400'>Admin Dashboard</span>
          </h1>
        </div>

        <div className='sm:flex hidden items-center justify-between gap-5'>
          <label htmlFor='search' className='relative flex items-center'>
            <input
              type='search'
              id='search'
              className='outline-none rounded-full   border-none pl-7'
              placeholder='Search User '
            />
            <SearchIcon color='gray' className='absolute w-5' />
          </label>

          <div className='sm:flex hidden items-center gap-2 '>
            <div className='group relative'>
              <SettingsIcon
                color='white'
                fill='gray'
                className='group-hover:rotate-45 duration-200'
              />
              <div className='group-hover:block duration-300 hidden absolute right-2 pt-4'>
                <div className=' duration-300  rounded-xl  hover:bg-black  bg-white border-[1px]'>
                  <p
                    className='text-gray-500 px-4 py-2 hover:text-white cursor-pointer'
                    onClick={() => {
                      localStorage.clear(), location.reload();
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
            {/* ---------HELP--------- */}
            <div className='group relative'>
              <CircleHelpIcon
                color='white'
                fill='gray'
                className='hover:scale-105 duration-300'
              />
              <div className='group-hover:block duration-300 hidden absolute -right-10 pt-4'>
                <div className='transition-all duration-300 w-36  rounded-xl  hover:bg-black  bg-white border-[1px]'>
                  <p className='text-gray-500 w-full text-center hover:text-white px-2 py-2 cursor-pointer'>
                    This is only Test
                  </p>
                </div>
              </div>
            </div>
            <p className='text-sm font-poppins tracking-wide'>{username}</p>
            <UserCircle color='white' fill='gray' />
            {/* User Image here */}
          </div>
        </div>

        <MenuIcon className='sm:hidden block' />
      </nav>
      <hr />
    </header>
  );
};

export default Navbar;
