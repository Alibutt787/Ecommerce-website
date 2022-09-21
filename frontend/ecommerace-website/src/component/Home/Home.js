import React, { useEffect } from 'react'
import { CgChevronDoubleUp } from "react-icons/cg";
import './Home.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../Store/Product/ActionThunk';
import { Loading } from '../layout/Loading/Loading';
import ProductCard from './ProductCard';

const Home = () => {

  const  {loading,product,error}= useSelector((state) => state.product)
 
  const dispatch = useDispatch();
 
useEffect(()=>{
  if(error){
return  alert(error);}
let link=`http://localhost:8080/api/`;
   dispatch(getProduct(link))
},[dispatch,error]);
return (
    <>
   <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#homeHeading">
              <button>
                Scroll 
                <CgChevronDoubleUp />
              </button>
            </a>
          </div>

          <h2 className="homeHeading" id="homeHeading">Featured Products</h2>

          <div className="container" id="container">

       {loading?  <Loading/>:error? <div className="text-danger"> {error}
       <button onClick={()=> dispatch(getProduct())}> Try Again</button>
       </div>:Array.isArray(product)? product.map((val,key)=>{
        return <ProductCard 
        key={key} product={val}/>
        
       }):<>Not Found Data <button onClick={()=> dispatch(getProduct())}>Try Again</button></>}
       </div>

    </>
  )
}
export default Home