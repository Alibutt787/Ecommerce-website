import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProfile } from '../../Store/User/ActionThunk'
import { Loading } from '../layout/Loading/Loading'
import './UserProfile.css'
const UserProfile = () => {
    const  {loading,error,profileData}= useSelector((state) => state.user)
    const dispatch = useDispatch();
console.log(profileData?.message,loading,error);

useEffect(()=>{
    if(error){
   alert(error);}
  },[error]);

useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  

  return (
    <div className='profileDiv'>
   
        {loading?<Loading/>:
        
        <h3>pakistan</h3>
  }
  {error} {profileData?.message}
        </div>
  )
}

export default UserProfile