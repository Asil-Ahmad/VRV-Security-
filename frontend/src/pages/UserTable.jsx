import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { sortArrow } from "../assets/icons";

const UserTable = ({ users, token }) => {
  const { navigate, backendURL } = useContext(ShopContext);
  const [sortUsers, setSortUsers] = useState(users);

  useEffect(() => {
    setSortUsers(users);
  }, [users]);

  const removeProducts = async (id) => {
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
    <table className='min-w-full text-left text-sm'>
      <thead className='font-normal'>
        <tr>
          <td
            onClick={handleSortById}
            scope='col'
            className='px-2 py-4  dark:border-neutral-600'
          >
           <div className="flex">
             Unique ID
              <img src={sortArrow} alt='' className='w-5' />
            </div>
          </td>
          <td scope='col' className='px-6 py-4  dark:border-neutral-600'>
            Image
          </td>
          <td
            onClick={handleSort}
            scope='col'
            className='px-3  py-4 flex  dark:border-neutral-600'
          >
            Name
            <img src={sortArrow} alt='' className='w-5' />
          </td>
          <td
            onClick={handleSortByEmail}
            scope='col'
            className='px-3  py-4  dark:border-neutral-600'
          >
            <div className="flex">
              Email
              <img src={sortArrow} alt='' className='w-5' />
            </div>
          </td>
          <td scope='col' className='px-3  py-4  dark:border-neutral-600'>
            Mobile No
          </td>
          <td scope='col' className='px-3  py-4  dark:border-neutral-600'>
            Designation
          </td>
          <td scope='col' className='px-3  py-4  dark:border-neutral-600'>
            Gender
          </td>
          <td scope='col' className='px-3  py-4  dark:border-neutral-600'>
            Course
          </td>
          <td scope='col' className='px-3  py-4  dark:border-neutral-600'>
            Create Date
          </td>
          <td scope='' className='px-3  py-4  dark:border-neutral-600'>
            Action
          </td>
        </tr>
      </thead>
      {sortUsers.map((user) => (
        <tbody key={user._id} className='bg-white '>
          <tr className=''>
            <td
              scope='row'
              className='px-6 py-4 overflow-x-auto  max-w-12 dark:border-neutral-600'
            >
              {user._id}
            </td>
            <td className='px-6 py-4 border-x dark:border-neutral-600'>
              <img
                src={user.image}
                alt={user.name}
                className='w-12 h-12 object-cover'
              />
            </td>
            <td className='px-6 py-4 border-x dark:border-neutral-600'>
              {user.name}
            </td>
            <td className='px-6 py-4 border-x dark:border-neutral-600'>
              <a href='' className='underline text-blue-500'>
                {user.email}
              </a>
            </td>
            <td className='px-6 py-4 border-x dark:border-neutral-600'>
              {user.number}
            </td>
            <td className='px-6 py-4 border-x dark:border-neutral-600'>
              {user.designation}
            </td>
            <td className='px-6 py-4 border-x dark:border-neutral-600'>
              {user.gender}
            </td>
            <td className='px-6 py-4 border-x dark:border-neutral-600'>
              {user.courses}
            </td>
            <td className='px-6 py-4  dark:border-neutral-600'>
              {new Date(user.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </td>
            <td className='px-6 py-4 border-l dark:border-neutral-600'>
              <div className=' flex gap-2'>
                <button
                  onClick={() => navigate(`/edit_employee/${user._id}`)}
                  className='bg-green-500 px-2 text-gray-100'
                >
                  Edit
                </button>
                <button
                  popovertarget='box'
                  className='bg-red-500 px-2  text-gray-100'
                >
                  Delete
                </button>
              </div>
              <div
                id='box'
                popover='auto'
                className='bg-white border-red-500 border-[2px] sm:w-[25%] sm:h-[25%] w-full h-full p-2 text-center  content-center '
              >
                <p className='text-2xl'>Are sure want to delete</p>
                <input
                  type='submit'
                  value='Yes'
                  onClick={() => removeProducts(user._id)}
                  className='text-white mt-5 cursor-pointer  bg-red-500 px-4 py-2 rounded-full'
                />
              </div>
            </td>
          </tr>
          <hr />
        </tbody>
      ))}
    </table>
  );
};

export default UserTable;
