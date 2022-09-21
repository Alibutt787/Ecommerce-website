import React,{useEffect, useState} from 'react'
import pic from '../../images/logSign.jpg'
import './SignUp.css'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { signUpReq } from '../../Store/User/ActionThunk';
import { useDispatch, useSelector } from 'react-redux';
import profilePic from '../../images/profile.jpg'
import { Loading } from '../layout/Loading/Loading';
import { useNavigate } from "react-router-dom";

const SignUp = ({setLogin}) => {

  let navigate = useNavigate();
  const [userName,setUserName]=useState("");
  const [userEmail,setUserEmail]=useState("");
  const [userPassword,setUserPassword]=useState("");
  const [userConfirmPassword,setUserConfirmPassword]=useState("");
  const [avatar, setAvatar] = useState(profilePic);
  const [avatarPreview, setAvatarPreview] = useState(profilePic);
  
  const  {loading, signUpError,user, isAuthenticate}= useSelector((state) => state.user);
  console.log("sign Up",user);
  const dispatch = useDispatch();

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      // setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


   function signUpHandler(e){
    e.preventDefault();
    if(userPassword!==userConfirmPassword){
      return alert("password and confirm password not match")
    }
dispatch(signUpReq({name:userName,email:userEmail,password:userPassword,
  confirmPassword:userConfirmPassword
  ,avatar:avatar}))
  }

  useEffect(()=>{
    if(isAuthenticate){
      // navigate('/account/userProfile');
    }
  },[isAuthenticate,navigate]);
 
  return (
  <div className='signUp'>
      {loading? <Loading/> :
      <div>
  <div className='signUpBox'>
  <img src={pic} alt='login img'/> 
  <h3>Sign Up</h3>
  <h4>{ signUpError}</h4>

<form onSubmit={signUpHandler}>
  <label  htmlFor="UserName">User Name</label>
  <input type="text" id="UserName" name="UserName" onChange={(e)=>setUserName(e.target.value)} required/>
  <label  htmlFor="Email">Email</label>
  <input type="email" id="Email" name="Email" onChange={(e)=>setUserEmail(e.target.value)} required/>
  <label  htmlFor="Password">Password</label>
  <input type="text" id="password" name="password"  onChange={(e)=>setUserPassword(e.target.value)} required/>
  <label  htmlFor="confirmPassword">Confirm Password</label>
  <input type="text" id="confirmPassword" name="confirmPassword"   onChange={(e)=>setUserConfirmPassword(e.target.value)} required/>
  
  <div className='fileUpload'>
  
  <label  htmlFor="uploadFile" >Upload File <span>
  <AiOutlineCloudUpload/>
    </span>
    
    </label>
  <input type="file" id="uploadFile"   name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
           required/>
  <img src={avatarPreview} alt='pic' />
  </div>

 <input type="submit" />
  </form>

  </div>
  <span onClick={()=>setLogin(false)}>Already have account </span>
 </div> 
}
  </div>
  )
}

export default SignUp