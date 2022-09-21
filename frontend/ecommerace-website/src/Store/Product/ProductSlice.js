import { createSlice } from '@reduxjs/toolkit'
import { getProduct,getProductById } from './ActionThunk';

const initialState = {};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers:{
    //get product
    [ getProduct.pending]:(state,action)=>{
     return {loading:true}
    }, 
    [ getProduct.fulfilled]:(state,action)=>{
      return{
       loading:false,
       product:action.payload.data,
       productCoun:action.payload.productCount,
       resultPerPage:action.payload.resultPerPage
       }
    },
     [ getProduct.rejected]:(state,action)=>{
     return{
      loading:false,
      error:action.error.message
     }
      
    },
    //get product by id
    [ getProductById.pending]:(state,action)=>{
      return {
        loading:true,
      }
     }, 
     [ getProductById.fulfilled]:(state,action)=>{
       return{
        loading:false,
        product:action.payload.data
        }
     },
      [ getProductById.rejected]:(state,action)=>{
      return{
       loading:false,
       error:action.error.message
      }
     },

  }
})

// Action creators are generated for each case reducer function
export const { clearErrors } = counterSlice.actions

export default counterSlice.reducer