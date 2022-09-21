import React,{Fragment, useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../Store/Product/ActionThunk';
import ProductCard from '../Home/ProductCard';
import { Loading } from '../layout/Loading/Loading';
import './products.css'
import Pagination from "react-js-pagination";
import {  Slider } from '@mui/material';



const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Mobile",
  "Software Engineer"
];



const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const  {loading,product,error,productCount,resultPerPage}= useSelector((state) => state.product)
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 25000]);
  
  const filterSubmitHandler = (e) => {

    e.preventDefault();
    console.log(ratings);
    let link=`http://localhost:8080/api/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=&category=${category}&ratings=${ratings}`
    dispatch(getProduct(link));
  }
 
const searchSubmitHandler = (e,value) => {
  e.preventDefault();
  // if (keyword.trim()) {
  //     dispatch(getProduct(keyword))
  
  // } 
  if (value?.trim()) {
      // dispatch(getProduct(value))
      setKeyword(value);
            
  }
  else if(value===""){
    setKeyword("");
  }   

};
useEffect(()=>{
  if(error){
return  alert(error);}
let link=`http://localhost:8080/api/?keyword=${keyword}&page=${currentPage}`
dispatch(getProduct(link));
},[dispatch,error,keyword,currentPage]);

  return (
    <Fragment>
 <h2 className="homeHeading" >Featured Products</h2>

<form className="searchBox " onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
        //   onChange={(e) => setKeyword(e.target.value)}
          onChange={(e) => searchSubmitHandler(e,e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>

      
  <div className='ProductContainerBox'>
      <div className='filter'>
 <form  onSubmit={filterSubmitHandler}> 
<h3 className="filterHeading" >Filters</h3>
<span>Price</span>
<Slider
  getAriaLabel={() => 'Price range'}
  value={price}
  onChange={(e,val)=>setPrice(val)}
  max={2500}
  valueLabelDisplay="auto"
  // getAriaValueText={valuetext}
/>
<span >categories</span> 
<select className="inputNumber"
onChange={(e)=>setCategory(e.target.value)}
>
<option disable="true"> </option> 
  {categories.map((val,ind)=>{
    return <option key={ind} value={val} >
{val}
    </option>
  })}
</select>
<span >Ratings   <span>{ratings}</span></span> 
<Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
              <input  className="inputbutton" type={"submit"} />
</form>
</div>
<div  className='container'>
{loading?  <div className='notFound'><Loading/></div>:error? <div className=' notFound'> {error}
<div>
<button onClick={()=> dispatch(getProduct(`http://localhost:8080/api/?keyword=${keyword}&page=${currentPage}`))}> Try Again</button>
</div>
</div>:Array.isArray(product)? product.length===0? <div className="notFound">Product Not Found</div>
: 
<div>


    <div className="container">
    {product?.map((val,key)=>{
return <ProductCard 
key={key} product={val}/>

})}
</div>
{resultPerPage < productCount &&
<div className="paginationBox">


<Pagination
         activePage={currentPage}
         itemsCountPerPage={resultPerPage}
         totalItemsCount={productCount}
         onChange={e=> setCurrentPage(e)}
         nextPageText="Next"
         prevPageText="Prev"
         firstPageText="1st"
         lastPageText="Last"
         itemClass="page-item"
         linkClass="page-link"
         activeClass="pageItemActive"
         activeLinkClass="pageLinkActive"
       />
</div>
}
</div>
:<>Not Found Data <button onClick={()=>
 dispatch(getProduct(`http://localhost:8080/api/?keyword=${keyword}&page=${currentPage}`))}>Try Again
 </button></>}
 </div>
</div>
     </Fragment>
  )
}

export default Products