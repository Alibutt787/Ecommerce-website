import React, { useState,useEffect } from 'react'
import pic from '../../images/logSign.jpg'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { LoginReq } from '../../Store/User/ActionThunk'
import { useNavigate } from "react-router-dom";
import { Loading } from '../layout/Loading/Loading'
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie] = useCookies(['jwttoken']);
  let navigate = useNavigate();
  const [userEmail,setUserEmail]=useState("")
  const [userPassword,setUserPassword]=useState("")
  const  {loading, LoginError,user, isAuthenticate}= useSelector((state) => state.user)
  const dispatch = useDispatch();
   function LoginHandler(e){
    e.preventDefault();
dispatch(LoginReq({email:userEmail,password:userPassword}))
 
}
  useEffect(()=>{
    
    if(isAuthenticate){
      localStorage.setItem("Userjwt", JSON.stringify(user?.token));
      navigate('/account/userProfile');
    }
  },[isAuthenticate,navigate,user]);
 

  return (
    <div className='Login'>    
      <div className='LoginBox'>
  
       <img src={pic} alt='login img'/> 
       <h3>Login</h3>
        <h4 >{LoginError}</h4>    
        {loading?<Loading/>:
<form onSubmit={LoginHandler}>
<label  htmlFor="UserEmail">Email </label>
<input type="email" id="UserEmail" name="UserEmail" placeholder='AliButt@gmail.com' onChange={(e)=>setUserEmail(e.target.value)} required/>
<label  htmlFor="Password">Password</label>
<input type="password" id="password" name="password" onChange={(e)=>setUserPassword(e.target.value)} required/>
<input type="submit" />
</form>

}

   </div>
   <span>forget password</span>
   </div>
  )
}

export default Login