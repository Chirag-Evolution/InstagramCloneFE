import React from 'react'
import instagram from './assets/instagram.png'
import './Signup.css';
export default function Signup() {
  const handleSubmit=(e)=>
  {
    e.preventDefault();
  console.log("button clicked");
  }
  return (
    <>
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='main mt-4'>
       <h2><img src={instagram}></img></h2>
        <div className='header'>

        <p>Sign Up to see photos & videos <br></br><span>from your friend </span></p>
        <form onSubmit={handleSubmit}>
          <input className='form-control' type='email' name='email' placeholder='Email' required/>
          <input className='form-control' type='text' name='name' placeholder='Full Name' required/>
          <input className='form-control' type='text' name='uname' placeholder='Username' required/>
          <input className='form-control' type='password' name='password' placeholder='password' required/>
          <p>By signing up, you agree to out terms,<br></br>Privacy Policy and cookie policy from your friend</p>

          <button className='btn btn-primary' type='submit'>Submit</button>


        </form>
        </div>
      </div>
    </div>
    </>
  )
}
