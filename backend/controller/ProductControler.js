
const apiFeature = require('../middleware/apifeature');
const product =require('../model/productModel');
const cloudinary =require('cloudinary');
const ayscErrorHandler = require('../middleware/ayscErrorHandler');
const ErrorHandler = require('../middleware/errorhandler');
const user = require('../model/user');
const e = require('express');




//create Product
exports.CreateProduct=ayscErrorHandler(async (req, res, next) => {
   
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }
  // const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "products",
      
  //   });
  //   console.log(result);
  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.images = imagesLinks;
  const product1 = await product.create(req.body);

  res.status(201).json({
    success: true,
    product1
    
    
  });
});

//get all data
exports.Getdata=ayscErrorHandler(async (req, res, next) => {
  // const android='android';
  // const api=await product.find({android}); 
  // const api=await product.find({ name: { '$regex': 'android', '$options': "i" } }); 
  const resultPerPage=8
  const productCount=await product.countDocuments();
 const api= new apiFeature(product.find(),req.query).search().filter().pagination(resultPerPage);
  const data=await api.query;

 res.json( {
  data,
  productCount,
resultPerPage,
});

});

//get data by id
exports.GetdatabyId=ayscErrorHandler(async (req, res, next) => {
 const data=await product.findById(req.params.id); 
 res.json( {data} );

});



// delete product by id  
exports.DeleteDatabyId=(req,res,next)=>{
    product.findById(req.params.id).then(data=>{
        data.remove()
        res.json(data); 
     }).catch(err=>next(new ErrorHandler(`error exist ${err}`,201)))
   
}

//add or update rewiews
exports.AddReview=ayscErrorHandler(async(req,res,next)=>{

  const {rating,comment,productId}=req.body;
  const review={ 
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment:comment,
  }
 
 const product1= await product.findById(productId);
 
 
 const isReview=product1.reviews.find(rev =>  rev.user.toString() === req.user._id.toString() 
 );

 if(isReview) {
  product1.reviews.forEach(rev => {
   if( rev.user.toString() === req.user._id.toString()){
    rev.comment=review.comment;
    rev.ratings=review.rating;
   }
   });
 } else {
  product1.reviews.push(review);
 }
let avg=0;
product1.reviews.forEach((rev) => {
  avg += rev.rating;
});
product1.ratings=avg / product1.reviews.length;
product1.numOfReviews=product1.reviews.length;
await product1.save({ validateBeforeSave: false });
 res.json({
  success:true,
product1})
 
})

//delete rewiews
exports.delReview=ayscErrorHandler(async(req,res,next)=>{

  const product1=await product.findById(req.query.productId);
  const reviews= product1.reviews.filter(
    (rev) => rev.user.toString() !== req.user._id.toString()
  );
 
  product1.reviews=reviews;

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;

  if (reviews.length === 0) {
    product1.ratings = 0;
  } else {
    product1.ratings = avg / reviews.length;
  }

  product1.numOfReviews=reviews.length;

product1.save({validateBeforeSave:false});
  res.json({
    success:true,
    product1
  })
})
// get all reviews
exports.getAllReviews=ayscErrorHandler(async(req,res,next)=>{
  console.log(req.query._id.toString());
    const Product = await product.findById(req.query._id);
  
    if (!Product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      reviews: Product.reviews,
    });
  });