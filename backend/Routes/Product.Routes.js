const express=require('express');
const { Getdata, GetdatabyId, DeleteDatabyId, CreateProduct, AddReview,getAllReviews, delReview } = require('../controller/ProductControler');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const ProductRoutes=express.Router();


ProductRoutes.route('/').get(Getdata);
ProductRoutes.route('/').post(isAuthenticated,CreateProduct);
ProductRoutes.route('/:id').get(GetdatabyId);
ProductRoutes.route('/:id').delete(DeleteDatabyId);
ProductRoutes.route('/addReview').put(isAuthenticated,AddReview);
ProductRoutes.route('/product/allReviews').get(getAllReviews);
ProductRoutes.route('/product/delReviews').delete(isAuthenticated,delReview);





module.exports =ProductRoutes;
