import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const username = localStorage.getItem("username");

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/user/list`, {
        headers: { token },
      });
      if (res.data.message) {
        const { allUser } = res.data;
        setUsers(allUser);
      }
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const value = {
    username, //logged username
    backendURL,
    users,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
