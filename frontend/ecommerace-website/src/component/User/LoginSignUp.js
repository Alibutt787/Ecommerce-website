import React, { useState } from 'react'
import './LoginSignUp.css'
import Login from './Login'
import SignUp from './SignUp'
 const LoginSignUp = () => {

  const [login, setLogin]=useState(false);

  return (
    <div className='LoginSignUp'>
      <div className='LoginSignUpDiv'>
      
      <div className='LoginSignUpDivBtn'>
<span onClick={()=>setLogin(false)}>
  Login 
  </span>
  <span  onClick={()=>setLogin(true)}>
  Register
  </span>
      </div>

      <div className='LoginSignUpContent'>
      {login ?   <SignUp  setLogin={setLogin} />:<Login/> }
    
      </div>

      </div>
     
      
      
      </div>
  )
}

export default LoginSignUp