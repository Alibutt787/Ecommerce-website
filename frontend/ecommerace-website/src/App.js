import React,{useEffect} from "react";
import { BrowserRouter,
  Routes,
  Route} from "react-router-dom"
import  Header  from "./component/layout/Header/Header";
import { Footer } from "./component/layout/Footer/Footer";
import WebFont from 'webfontloader'
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Product";
import LoginSignUp from "./component/User/LoginSignUp";
import UserProfile from "./component/profile/UserProfile";

function App() {

    useEffect(() => {
      WebFont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
        },
      });

    }, []);
  return (

<BrowserRouter>
<Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/products" element={<Products/>} />
      <Route exact path="/LoginSignUp" element={<LoginSignUp/>} />
      <Route exact path="/about" element={<LoginSignUp/>} />
      <Route exact path="/account/userProfile" element={<UserProfile/>} />
      <Route exact path="/account/forgetPwd" element={<UserProfile/>} />
      
     </Routes>
  <Footer/>
  </BrowserRouter>



    
  );
}

export default App;
