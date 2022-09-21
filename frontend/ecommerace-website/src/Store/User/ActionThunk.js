import { createAsyncThunk} from '@reduxjs/toolkit'

//Login
export const LoginReq = createAsyncThunk(
    'UserLoginReq/data',  async (object, thunkAPI) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // credentials: true,
            body: JSON.stringify(object)
        };
     const data =await fetch('http://localhost:8080/account/login',requestOptions)
 {  const response=await data.json() ;
        console.log(response);
    if (data.status === 200) {
      // localStorage.setItem("token", response.token)
      return {...response};
    }else {
      
      return thunkAPI.rejectWithValue(response.message);
    }
  }
}
  )

  //SignUp
    export const signUpReq = createAsyncThunk(
        'UserSignUpReq/data',  async (object, thunkAPI) => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: true,
            body: JSON.stringify(object)
        };
     const data =await fetch('http://localhost:8080/account/signup',requestOptions)
 {  const response=await data.json() ;
        console.log(response);
    if (data.status === 200) {
      // localStorage.setItem("token", response.token)
      return {...response};
    }else {
      return thunkAPI.rejectWithValue(response.message);
    }
  }     }     )

//Profile

          export const  getUserProfile = createAsyncThunk(
            'getUserProfilee/data',
            async (id, thunkAPI) => {
                const response = await fetch(
                  'http://localhost:8080/account/userProfile');
               return await response.json();
            }
          );
          


        
