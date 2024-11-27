import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../constant/Loader";
import { addimage, user } from "../assets/icons";
import { createuser } from "../assets/images";
import Lottie from "lottie-react";

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
        }, 3000);
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
    <section className='lg:px-20 px-0 w-full'>
      <p className='text-xl sm:text-left text-center font-poppins text-gray-400 font-light px-2 py-2'>
        Create New User
      </p>
      <div className='sm:flex justify-center m-auto sm:pb-5 pb-0 '>
        <form
          onSubmit={handleSubmit}
          className='sm:py-[0.5rem] py-5 px-10 font-poppins flex flex-col justify-center sm:rounded-l-2xl max-sm:rounded-none gap-4 bg-white border-[1px]'
        >
          {/* //---------IMAGE UPLOAD-------------------------------------------------------  */}
          <div className='flex justify-center  gap-5 w-full'>
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
            className='outline-none border-[1px] rounded-lg py-2 px-2'
            type='text'
            placeholder='Name'
            autoFocus
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          {/* //---------EMAIL-------------------------------------------------------  */}

          <input
            className='outline-none border-[1px] rounded-lg px-2 py-2'
            type='email'
            placeholder='Email'
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* //---------MOBILE NO-------------------------------------------------------  */}

          <input
            className='outline-none border-[1px] rounded-lg px-2 py-2'
            type='text' //we added text becoz maxlength in ignored in number
            placeholder='Mobile No.'
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
            className='outline-none border-[1px] rounded-lg px-2 py-2'
            onChange={(e) => setDesignation(e.target.value)}
            required
          >
            <option value=''>Select Roles</option>
            <option value='HR'>HR</option>
            <option value='Manager'>Manager</option>
            <option value='Sales'>Sales</option>
          </select>

          {/* //---------GENDER-------------------------------------------------------  */}
          <div className='flex gap-5 font-poppins w-full text-black justify-evenly'>
            <label htmlFor='male' className='flex items-center gap-2'>
              Male
              <input
                type='radio'
                id='male'
                name='gender'
                value='Male'
                required
                className='flex accent-sky-500'
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
                className='flex accent-pink-500'
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
          </div>
          {/* //---------COURSES-------------------------------------------------------  */}
          <div className='flex sm:flex-row flex-col gap-5 w-full '>
            <p className=''>Courses :</p>
            <div className="flex  gap-3">
              <label htmlFor='mca' className='flex items-center gap-2'>
                {" "}
                MCA
                <input
                  type='checkbox'
                  id='mca'
                  value='MCA'
                  className='accent-[#059669]'
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
                  className='accent-[#059669]'
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
                  className='accent-[#059669]'
                  checked={courses === "BSC"}
                  onChange={(e) => setCourses(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* //---------SUBMIT BUTTON-------------------------------------------------------  */}

          <input
            className='bg-[#059669] py-1 rounded-lg w-full text-center text-white'
            type='submit'
            value='Submit'
          />
        </form>
        <div className='sm:flex hidden'>
          <Lottie
            animationData={createuser}
            loop={false}
            className='w-[24rem]   '
            title='List All Users'
          />
        </div>
      </div>
    </section>
  );
};

export default CreateEmployee;
