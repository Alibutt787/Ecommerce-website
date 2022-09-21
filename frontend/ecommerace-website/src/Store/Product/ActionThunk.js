import { createAsyncThunk} from '@reduxjs/toolkit'

export const getProduct = createAsyncThunk(
    'getFetchProduct/data',  async (id) => {
     return await fetch(id).then((data)=>
        data.json())
      }
    )
    export const getProductById = createAsyncThunk(
      'getProduct/databyid',  async (id) => {
  
       return await fetch(id).then((data)=>
          data.json())
       
        }
      )


    