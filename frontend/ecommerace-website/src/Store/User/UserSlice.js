import { createSlice } from '@reduxjs/toolkit'
import { getUserProfile, LoginReq, signUpReq } from './ActionThunk';

const initialState = {
  LoginError: null,
  signUpError: null,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    clearError:(state,action)=>{
     return( { ...state,
      error:null,
      signUpError: null,
      })
    }
  },

  extraReducers:{
    //Login req
    [ LoginReq.pending]:(state,action)=>{
      return ({
        ...state,
        loading:true,
        LoginError:null,
      isAuthenticate:false,
      })
     }, 
     [ LoginReq.fulfilled]:(state,action)=>{
       return({
        ...state,
        loading:false,
        LoginError:"success",
        user:action.payload,
        isAuthenticate: true ,

      })
     },
      [ LoginReq.rejected]:(state,action)=>{
      return ({
        ...state,
       loading:false,
       LoginError:action.payload,
      isAuthenticate:false,
      user:null,
      })
    },
      //Sign Up
  [ signUpReq.pending]:(state,action)=>{
    return ({
      ...state,
      loading:true,
      signUpError:null,
    isAuthenticate:false,
    })
   }, 
   [ signUpReq.fulfilled]:(state,action)=>{
     return ({
      ...state,
      loading:false,
      user:action.payload,
      signUpError:"Success",
      isAuthenticate:true,
      })
   },
    [ signUpReq.rejected]:(state,action)=>{
    return ({
      ...state,
       loading:false,
       signUpError:action.payload,
      isAuthenticate:false,
      user:null
    })
  } ,
  //Profile 
  //get profile of user
[ getUserProfile.pending]:(state,action)=>{
  return {
    ...state,
    loading:true,
    error:null,

  }
 }, 
 [ getUserProfile.fulfilled]:(state,action)=>{
   return{
    ...state,
    loading:false,
    profileData:action.payload
    }
 },
  [ getUserProfile.rejected]:(state,action)=>{
  return{
  

   ...state,
       loading:false,
       error:action.payload,
  }
   
 }, 
  },


})

// Action creators are generated for each case reducer function
export const {clearError} = counterSlice.actions

export default counterSlice.reducer