import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../constant/Loader";
import { addimage } from "../assets/icons";
import { useParams } from "react-router-dom";

const EditEmployee = ({ token }) => {
  const { backendURL, navigate } = useContext(ShopContext);
  const { _id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        backendURL + "/api/user/update",
        {
          _id,
        },
        {
          headers: { token },
        }
      ); //we using {_id} and header to post Method for update and validate if its admin or not
      const { updatedUser } = response.data;
      console.log(updatedUser);

      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setNumber(updatedUser.number);
      setDesignation(updatedUser.designation);
      setGender(updatedUser.gender);
      setCourses(updatedUser.courses);
      setImage(updatedUser.image);
      console.log(updatedUser);
    } catch (error) {
      toast.error("Failed to fetch user details.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("_id", _id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append("courses", courses);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        backendURL + "/api/user/update",
        formData,
        {
          headers: { token },
        }
      );
      setLoading(true);
      if (response.data) {
        setName("");
        setEmail("");
        setNumber("");
        setDesignation("");
        setGender("");
        setCourses("");
        setImage(false);
        setLoading(false);
        toast.success("User updated successfully!");
        setTimeout(() => {
          navigate("/employee_list");
          location.reload();
        }, 1000);
      }

      console.log(response.data);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update user.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className='bg-[#ffff00]'>Employee Edit</h1>

      <form
        onSubmit={handleSubmit}
        className='px-20 py-10 w-[50%] grid grid-cols-1 grid-rows-4 gap-4'
      >
        {/* //---------NAME-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Name</p>
          <input
            className='border-black border-[1px] max-w-48'
            type='text'
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* //---------EMAIL-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Email</p>
          <input
            className='border-black border-[1px] max-w-48 '
            type='email'
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {/* //---------MOBILE NO-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Mobile No</p>
          <input
            className='border-black border-[1px] max-w-48'
            type='text' //we added text becoz maxlength in ignored in number
            value={number}
            pattern='\d*' //we add this to
            maxLength='10'
            required
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
        {/* //---------DESIGNATION------------------------------------------------------- */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Designation</p>
          <select
            className='border-black border-[1px]'
            onChange={(e) => setDesignation(e.target.value)}
            required
          >
            <option value=''>Choose an option.......</option>
            <option value='HR'>HR</option>
            <option value='Manager'>Manager</option>
            <option value='Sales'>Sales</option>
          </select>
        </div>
        {/* //---------GENDER-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Gender</p>
          <label htmlFor='male' className='flex items-center gap-2'>
            Male
            <input
              type='radio'
              id='male'
              value='Male'
              name='gender' //!name is importnat for radio button for gender
              checked={gender === "Male"}
              required
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label htmlFor='female' className='flex items-center gap-2'>
            Female
            <input
              type='radio'
              id='female'
              name='gender'
              checked={gender === "Female"}
              value='Female'
              required
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
        </div>
        {/* //---------COURSES-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Course</p>
          <label htmlFor='mca' className='flex items-center gap-2'>
            {" "}
            MCA
            <input
              type='checkbox'
              id='mca'
              value='MCA'
              checked={courses === "MCA"} //check only if mca and disable other check
              onChange={(e) => setCourses(e.target.value)}
            />
          </label>{" "}
          <label htmlFor='bca' className='flex items-center gap-2'>
            {" "}
            BCA
            <input
              type='checkbox'
              id='bca'
              value='BCA'
              checked={courses === "BCA"}
              onChange={(e) => setCourses(e.target.value)}
            />
          </label>{" "}
          <label htmlFor='bsc' className='flex items-center gap-2'>
            {" "}
            BSC
            <input
              type='checkbox'
              id='bsc'
              value='BSC'
              checked={courses === "BSC"}
              onChange={(e) => setCourses(e.target.value)}
            />
          </label>
        </div>
        {/* //---------IMAGE UPLOAD-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Upload Image</p>

          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : addimage}
              alt=''
              className='w-12 h-12  object-cover'
            />
          </label>
          <input
            type='file'
            id='image'
            accept='.jpg,.jpeg,.png'
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </div>
        {/* //---------SUBMIT BUTTON-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <div className='w-[25%]' />

          <input
            className='bg-green-400  w-[40%] text-start cursor-pointer'
            type='submit'
            value='Update'
          />
        </div>
      </form>
    </>
  );
};

export default EditEmployee;
