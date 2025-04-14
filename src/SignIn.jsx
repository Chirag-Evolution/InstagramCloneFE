import React from 'react'
import {Link} from 'react-router'
import instagram from './assets/instagram.png';
export default function SignIn() {
  const handleSubmit=()=>
  {

  }
  return (
    <div className='container d-flex justify-content-center align-items-center mt-5' >
          <div className='main mt-4' style={{boxShadow:'1px 1px 3px grey',margin:'20px',padding:'50px'}}>
           <h2><img src={instagram}></img></h2>
            <div className='header'> 
            <form onSubmit={handleSubmit}>
              <input className='form-control' type='email' name='email' placeholder='Email' required/>
              <input className='form-control' type='password' name='password' placeholder='password' required/>
      
              <button className='btn btn-primary mb-3' type='submit'>Sign in</button>
     <p>Don't have account ? <Link to='/signup' style={{textDecoration:'none'}}>Create Account</Link></p>
    
            </form>
            </div>
          </div>
        </div>
  )
}
