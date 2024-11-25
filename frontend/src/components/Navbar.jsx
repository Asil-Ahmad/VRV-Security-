import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { navlinks } from "../constant";
import { NavLink } from "react-router-dom";
import { logo } from "../assets/icons";
import {
  CircleHelpIcon,
  Search,
  SearchIcon,
  SettingsIcon,
  UserCircle,
} from "lucide-react";

const Navbar = () => {
  const { username } = useContext(ShopContext);
  return (
    <header className=''>
      <nav className='py-5 w-full flex justify-between items-center '>
        <div className='flex gap-2 items-center'>
          <img src={logo} alt='' className='w-12 rounded' />
          <h1 className='font-poppins text-xl font-medium'>
            VRV {""}
            <span className='font-light text-gray-400'>Admin Dashboard</span>
          </h1>
        </div>

        <div className='flex items-center justify-between gap-5'>
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
          <SettingsIcon color="white" fill="gray" />
          <CircleHelpIcon color="white" fill="gray" />
            <p className='text-sm font-poppins tracking-wide'>Asil Ahmad</p>
            <UserCircle color="white" fill="gray" />
            {/* User Image here */}
          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Navbar;
