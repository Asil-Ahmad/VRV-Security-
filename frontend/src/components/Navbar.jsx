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
  const { username } = useContext(ShopContext);
  return (
    <header className='sm:px-20 px-2'>
      <nav className='py-5 w-full flex justify-between items-center '>
        <div className='flex gap-2 items-center'>
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
            <SettingsIcon color='white' fill='gray' className="hover:rotate-45 duration-200" />
            <CircleHelpIcon color='white' fill='gray' className="hover:scale-105 duration-300" />
            <p className='text-sm font-poppins tracking-wide'>Asil Ahmad</p>
            <UserCircle color='white' fill='gray' />
            {/* User Image here */}
          </div>
        </div>

          <MenuIcon className="sm:hidden block" />
        
      </nav>
      <hr />
    </header>
  );
};

export default Navbar;
