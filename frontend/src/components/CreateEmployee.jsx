import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../constant/Loader";
import { addimage, user } from "../assets/icons";

const CreateEmployee = ({ token }) => {
  const { backendURL, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email.toLowerCase());
      formData.append("number", number);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append("courses", courses);
      formData.append("image", image);

      //!now we submit datahere
      const res = await axios.post(
        `${backendURL}/api/user/register`,
        formData,
        {
          headers: { token },
        }
      );

      if (res.data.message) {
        setName("");
        setEmail("");
        setNumber("");
        setDesignation("");
        setGender("");
        setCourses("");
        setImage(""); //!remember to set it to false
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/employee_list");
          location.reload();
        }, 2000);
      } else {
        console.log("An error occured.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className='bg-[#ffff00]'>Create Employee</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        {/* //---------IMAGE UPLOAD-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : user}
              alt=''
              className='w-44 h-44 rounded-full  object-cover'
            />
          </label>
          <input
            type='file'
            id='image'
            required
            accept='.jpg,.jpeg,.png'
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </div>
        {/* //---------NAME-------------------------------------------------------  */}

        <input
          className='border-black px-2 border-[1px]  max-w-48  '
          type='text'
          placeholder='Name'
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        {/* //---------EMAIL-------------------------------------------------------  */}

        <input
          className='border-black px-2 border-[1px] max-w-48 '
          type='email'
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        {/* //---------MOBILE NO-------------------------------------------------------  */}

        <input
          className='border-black px-2 border-[1px] max-w-48'
          type='text' //we added text becoz maxlength in ignored in number
          value={number}
          pattern='\d*' //we add this to
          maxLength='10'
          required
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />

        {/* //---------DESIGNATION------------------------------------------------------- */}

        <select
          className='border-black px-2 border-[1px]'
          onChange={(e) => setDesignation(e.target.value)}
          required
        >
          <option value=''>Choose an option.......</option>
          <option value='HR'>HR</option>
          <option value='Manager'>Manager</option>
          <option value='Sales'>Sales</option>
        </select>

        {/* //---------GENDER-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <p className='w-[25%]'>Gender</p>
          <label htmlFor='male' className='flex items-center gap-2'>
            Male
            <input
              type='radio'
              id='male'
              name='gender'
              value='Male'
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

        {/* //---------SUBMIT BUTTON-------------------------------------------------------  */}
        <div className='flex gap-5 w-full'>
          <div className='w-[25%]' />

          <input
            className='bg-green-400  w-[40%] text-start'
            type='submit'
            value='Submit'
          />
        </div>
      </form>
    </>
  );
};

export default CreateEmployee;
