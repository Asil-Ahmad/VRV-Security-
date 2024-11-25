import React, { useState, useEffect, useContext } from "react";
import UserTable from "../pages/UserTable";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const EmployeeList = ({ token }) => {
  const { users, backendURL } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  const applyFilter = () => {
    if (search) {
      // we wil aply filter only if search term there
      let filterItems = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user._id.toLowerCase().includes(search.toLowerCase()) ||
          new Date(user.date).toLocaleDateString().includes(search)
      );

      setFilterProducts(filterItems);
    } else {
      //! when search is empty shows none
      setFilterProducts(users);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [search, users]);

  return (
    <>
      <div className='grid grid-cols-2 grid-rows-1 gap-0 bg-[#ffff00]'>
        <h1 className=''>Employee List</h1>
        <div className='border-l-[1px] text-center border-black ' />
      </div>

      <div className='grid grid-cols-2 grid-rows-1 gap-0'>
        <div className='col-start-2 flex w-full'>
          <p className='w-1/2 text-center'>Total Count:{users.length}</p>
          <Link to='/create_employee' className='bg-[#80bc97] flex-1 px-1'>
            Create Employee
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-2 grid-rows-1 bg-[#b4d2ec] gap-0'>
        <div className='col-start-2 flex w-full'>
          <p className='w-1/2 text-center'>Search</p>
          <input
            type='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Enter Search Keyword'
            className='flex-1 px-2 outline-none placeholder:text-center border-[1px] border-black'
          />
        </div>
      </div>

      <div className='overflow-x-auto bg-[#b4d2ec] '>
        <UserTable users={filterProducts} token={token} />
      </div>
    </>
  );
};

export default EmployeeList;
