import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import { usersRef } from "../Firebase/Firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import swal from "sweetalert";

function Login() {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);

  const [form, setForm] = useState({
    mobile:"",
    password:"",
  })
  const [loading, setLoading] = useState(false);
  const login=async()=>{
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/card')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  return (
    <div className='w-full flex flex-col mt-8 items-center'>
      <h1 className='text-xl font-bold'>
        Login
      </h1>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="email" class="leading-7 text-m text-white">Mobile no</label>
          <input type={"number"}
           id="email" 
           name="email"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-m text-white">Password</label>
          <input type="password" id="name"
            value={form.password}
            onChange={(e) => setForm({ ...form,password: e.target.value })}
            name="name" className="w-full  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>

      <div class="p-2 w-full">
        <button  onClick={login}
        class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 mt-2 rounded text-lg">
          {
            loading ? <TailSpin height={25} color='white' /> : 'Login'
          }
        </button>
        <div>
          <p>Do not have an account ?
           <Link to='/signup'><span className='text-blue-500'> Sign up</span></Link>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Login