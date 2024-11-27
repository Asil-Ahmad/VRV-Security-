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
    <section className='lg:px-20 px-2'>
      <p className='text-xl sm:text-left text-center font-poppins text-gray-400 font-light px-2 py-2'>
        Employee List
      </p>

      <div className='overflow-x-auto bg-[#b4d2ec] '>
        <UserTable
          users={filterProducts}
          token={token}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </section>
  );
};

export default EmployeeList;
