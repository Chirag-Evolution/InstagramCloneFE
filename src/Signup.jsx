import React, { useState } from 'react'
import instagram from './assets/instagram.png'
import './Signup.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
export default function Signup() {
  let navigate = useNavigate();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('')
  const [uname,setUname]=useState('')
  const [password,setpassword]=useState('');
   
  const handleSubmit=(e)=>
  {
    e.preventDefault();
    const userData={uname,name,email,password};
    axios.post('http://localhost:3000/register/signup',userData).then((res)=>
    {
    toast(res.data.message);
    setEmail('');setName('');setUname('');setpassword('');
  }).catch(err=>console.log(err));
  
  //navigate('/signin');
  }
  return (
    <>
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='main mt-4'>
       <h2><img src={instagram}></img></h2>
        <div className='header'>

        <p>Sign Up to see photos & videos <br></br><span>from your friend </span></p>
        <form onSubmit={handleSubmit}>
          <input className='form-control' type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}   placeholder='Email' required/>
          <input className='form-control' type='text' name='name' value={name}   onChange={(e)=>{setName(e.target.value)}}     placeholder='Full Name' required/>
          <input className='form-control' type='text' name='uname' value={uname} onChange={(e)=>{setUname(e.target.value)}} placeholder='Username' required/>
          <input className='form-control' type='password' name='password' value={password}  onChange={(e)=>{setpassword(e.target.value)}} placeholder='password' required/>
          <p>By signing up, you agree to out terms,<br></br>Privacy Policy and cookie policy from your friend</p>

          <button className='btn btn-primary' type='submit'>Create Account</button>


        </form>
        </div>
      </div>
    </div>
    </>
  )
}
