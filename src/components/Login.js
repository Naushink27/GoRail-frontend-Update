import React, { useState } from 'react'
import Navbar from './Navbar';
import { FaTrainSubway } from "react-icons/fa6";
import Footer from '../pages/Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[isLogin,setIsLogin]=useState(true);
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessCreateAlert, setShowSuccessCreateAlert] = useState(false);
  const [errors,setErrors]=useState('')
console.log(BASE_URL)
  const handleLoginCreateAccount=async()=>{
      try{ 
         if(isLogin){
          console.log(BASE_URL)
             const res= await axios.post(BASE_URL+'/login',{
              email,
              password
             },{withCredentials:true})
             console.log(res.data.user)
             dispatch(addUser(res?.data?.user))
             
             if(res.data.success){
              setShowSuccessAlert(true);
              setTimeout(()=>{
                setShowSuccessCreateAlert(false)
                if(res.data.user.role=="user"){
                navigate('/trains')}
                else{
                  navigate('/adminDashboard')
                }
              },1000)
             }
     
            
            
        }
      else{
        const res=await axios.post(BASE_URL+'/signup',{
          firstName,
          lastName,
          email,
          password
        },{withCredentials:true})
        console.log(res)
        
        if(res.data){
          setShowSuccessCreateAlert(true)
          setTimeout(()=>{
            setShowSuccessAlert(false)
            navigate('/login')
          },1000)
        }
       
      }
      }
        
        catch(err){
            const error= err?.response?.data?.message;
            setErrors(error)
            setTimeout(()=>{setErrors('')},5000)
            
            console.log(error)
        }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar/>
      {showSuccessAlert && (
        <div role="alert" className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Login successful!Redirecting to app!!</span>
        </div>
      )}
        {showSuccessCreateAlert && (
        <div role="alert" className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Account Created Succesfully</span>
        </div>
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://png.pngtree.com/png-vector/20190515/ourmid/pngtree-train-icon-png-image_1043136.jpg"
            className="mx-auto h-10 w-auto"
          />
        { isLogin? <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Login to your account
          </h2> :<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
           Create Account
          </h2>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  className="space-y-6" onSubmit={(e) => {
  e.preventDefault();
  handleLoginCreateAccount();
}}>
     {/* FirstName */}
         {!isLogin&& <div>
              <div className="flex items-center justify-between">
                <label  className="block text-sm/6 font-medium ">
                First Name
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id=" FirstName"
                  name="FirstName"
                  type="text"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                  required
                
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>}
            {/* LastName */}
           { !isLogin&&<div>
              <div className="flex items-center justify-between">
                <label  className="block text-sm/6 font-medium ">
                  Last Name
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="LastName"
                  name="LastName"
                  type="text"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  required
                  
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>}
            {/* Email */}
              <div>
              <div className="flex items-center justify-between">
                <label  className="block text-sm/6 font-medium ">
                Email Address
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="Email"
                  name="Email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
              
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium ">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

         

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                
             >
               { isLogin? "Login" :"Create"}
              </button>
            </div>
          </form>
       {errors && <p className='text-red-500 text-center pt-3'>{errors}</p>}
       {isLogin ? (
  <p className="mt-10 text-center text-sm/6 text-gray-500">
    Not a member?{' '}
    <button
      type="button"
      className="font-semibold text-indigo-600 hover:text-indigo-500"
      onClick={() => setIsLogin(false)}
    >
      Click to create account!
    </button>
  </p>
) : (
  <p className="mt-10 text-center text-sm/6 text-gray-500">
    Already a user?{' '}
    <button
      type="button"
      className="font-semibold text-indigo-600 hover:text-indigo-500"
      onClick={() => setIsLogin(true)}
    >
      Click to Login!
    </button>
  </p>
)}

        </div>
      </div>
      <Footer/>
        </div>
  )
}

export default Login
