import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { sortArrow, verticaldots } from "../assets/icons";
import { tableheader } from "../constant";
import { CircleXIcon, FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";

const UserTable = ({ users, token, search, setSearch }) => {
  const { navigate, backendURL } = useContext(ShopContext);
  const [sortUsers, setSortUsers] = useState(users);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSortUsers(users);
  }, [users]);

  const removeUser = async (id) => {
    try {
      const response = await axios.post(
        backendURL + "/api/user/remove",
        { id },
        {
          headers: { token },
        }
      );
      if (response.data) {
        toast.success(response.data.message);
        setSortUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = () => {
    setSortUsers((prev) =>
      [...prev].sort((a, b) => a.name.localeCompare(b.name))
    );
  };
  const handleSortByEmail = () => {
    setSortUsers((prev) =>
      [...prev].sort((a, b) => a.email.localeCompare(b.email))
    );
  };
  const handleSortById = () => {
    setSortUsers((prev) =>
      [...prev].sort((a, b) => a._id.localeCompare(b._id))
    );
  };

  return (
    <div className='overflow-x-auto bg-white '>
      {/* <!-- Search input --> */}
      <div className='relative m-[2px] mb-3 mr-5 float-left'>
        <label for='inputSearch' className='sr-only'>
          Search{" "}
        </label>
        <input
          id='inputSearch'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search...'
          className='block w-64 rounded-lg border  py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none '
        />
        <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='h-4 w-4 text-neutral-500 dark:text-neutral-200'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </span>
      </div>

      {/* <!-- Filter --> */}
      <div className='relative m-[2px] mb-3 float-right hidden sm:block'>
        <label for='inputFilter' className='sr-only'>
          Filter
        </label>
        <select
          id='inputFilter'
          className='block w-40 rounded-lg border  p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400'
        >
          <option value='1' selected>
            Last week
          </option>
          <option value='2'>Last month</option>
          <option value='3'>Yesterday</option>
          <option value='4'>Last 7 days</option>
          <option value='5'>Last 30 days</option>
        </select>
      </div>
      <Link to='/create_employee' class='relative inline-block p-2 rounded-xl text-sm text-black transition bg-white border-[1px] group'>
        <span class='absolute rounded-xl inset-y-0 left-0 w-0 bg-[#059669] transition-all group-hover:w-full' />
        <span class='relative text-black rounded-xl transition-colors group-hover:text-white'>
          Create New User
        </span>
      </Link>

      {/* <!-- Table --> */}
      <table className='min-w-full text-left text-sm whitespace-nowrap'>
        {/* <!-- Table head --> */}
        <thead className='uppercase tracking-wider border-b-2 border-t'>
          <tr className='text-sm'>
            {tableheader.map((item) => (
              <th scope='col' className='px-3 py-2 border-x'>
                {item.header}
                <a className='inline'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 320 512'
                    className='w-[0.75rem] h-[0.75rem] inline ml-1 text-neutral-500 mb-[1px]'
                    fill='currentColor'
                    onClick={handleSort}
                  >
                    {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d='M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z' />
                  </svg>
                </a>
              </th>
            ))}
          </tr>
        </thead>

        {/* <!-- Table body --> */}
        <tbody>
          {sortUsers.map((user) => (
            <tr className='border-b  hover:bg-neutral-200 duration-150'>
              <th scope='row' className='px-3 py-2 border-x'>
                {user._id}
              </th>
              <td className='px-3 py-2  '>
                <img src={user.image} alt={user.name} className='w-7  ' />
              </td>
              <td className='px-3 py-2 border-x'>{user.name}</td>
              <td className='px-3 py-2 border-x'>{user.email}</td>
              <td className='px-3 py-2 border-x'>{user.number}</td>
              <td className='px-3 py-2 border-x'>{user.designation}</td>
              <td className='px-3 py-2 border-x'>{user.gender}</td>
              <td className='px-3 py-2 border-x flex items-center justify-between '>
                {user.courses}
                <div className='group relative '>
                  <img
                    src={verticaldots}
                    alt='vertical dots'
                    className='w-5 bg-gray-100 rounded-full'
                  />
                  <div className='group-hover:block cursor-pointer hidden duration-300  absolute -right-2 -top-[1.5rem]  pt-4'>
                    <div className='flex gap-2 duration-300 p-2 rounded-xl  bg-white border-[1px]'>
                      <CircleXIcon
                        color='white'
                        fill='red'
                        onClick={() => removeUser(user._id)}
                      />
                      <FilePenLine
                        color='white'
                        fill='green'
                        onClick={() => navigate(`/edit_employee/${user._id}`)}
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className='mt-5 flex items-center justify-between text-sm'
        aria-label='Page navigation example'
      >
        <p>
          Showing <strong>1-5</strong> of <strong>{users.length}</strong>
        </p>

        <ul className='list-style-none flex'>
          <li>
            <a
              className='relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all
               duration-300 hover:bg-neutral-100 border-[1px] dark:hover:bg-neutral-700 dark:hover:text-white'
              href='#!'
            >
              Previous
            </a>
          </li>
          <li>
            <a
              className='relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all
               duration-300 hover:bg-neutral-100 border-[1px] dark:hover:bg-neutral-700 dark:hover:text-white'
              href='#!'
            >
              1
            </a>
          </li>
          <li aria-current='page'>
            <a
              className='relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all
               duration-300'
              href='#!'
            >
              2
              <span className='absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]'>
                (current)
              </span>
            </a>
          </li>
          <li>
            <a
              className='relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all
               duration-300 hover:bg-neutral-100 border-[1px] dark:hover:bg-neutral-700 dark:hover:text-white'
              href='#!'
            >
              3
            </a>
          </li>
          <li>
            <a
              className='relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all
               duration-300 hover:bg-neutral-100 border-[1px] dark:hover:bg-neutral-700 dark:hover:text-white'
              href='#!'
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserTable;
