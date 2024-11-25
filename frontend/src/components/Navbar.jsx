import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { navlinks } from "../constant";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { username } = useContext(ShopContext);
  return (
    <header className='pt-5 '>
      <h1>Logo</h1>
      <nav className='border-black border-[1px] flex justify-evenly bg-[#d9e7f6]'>
        {navlinks.map((navlink, index) => (
          <NavLink key={index} to={navlink.link}>
            {navlink.label}
          </NavLink>
        ))}

        <p>{username}</p>
        <button
          onClick={() => {
            localStorage.clear(), location.reload();
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
