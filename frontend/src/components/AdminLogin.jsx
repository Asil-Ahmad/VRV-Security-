import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const AdminLogin = ({ setToken }) => {
  const { backendURL, navigate } = useContext(ShopContext);

  const [email, setEmail] = useState("ask@ask.com");
  const [password, setPassword] = useState("123as33134");

  document.title = "Admin Login";

  //!this is with try catch
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/user/admin`, {
        email,
        password,
      });
      console.log(response);

      if (response.data.message) {
        const { token, name } = response.data;
        setToken(token);
        localStorage.setItem("username", name);
        navigate("/dashboard");
        location.reload();
      } else {
        toast.error("Invalid");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className='container m-auto py-10 h-screen content-center xl:w-[30%] lg:w-[35%] md:w-[50%] sm:w-full'>
      <h1 className='  text-3xl tracking-wide text-center'>Admin Login</h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col m-auto  items-end py-10 gap-5'
      >
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className='border border-black w-full required:border-blue-500  invalid:border-red-500 outline-none py-4 px-2 rounded-lg'
          placeholder='Your email...'
        />
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className='border border-black w-full  outline-none py-4 px-2 rounded-lg'
          placeholder='Password...'
        />
        <input
          type='submit'
          value='Login'
          className='text-white mt-5 cursor-pointer  bg-black px-4 py-2 rounded-full'
        />
      </form>
    </div>
  );
};

export default AdminLogin;
