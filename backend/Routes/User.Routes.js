const express=require('express');
const UserRoutes = express.Router();
const  {Createuser,Loginuser, LogOutuser, AllUser, forgetPassword, resetPassword, userProfile, updatePassword, updateUserProfile, deleteUser, getSingleUser, updateUserRole} = require('../controller/UserControler');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

UserRoutes.route( '/signup' ).post( Createuser );

UserRoutes.route( '/login' ).post( Loginuser );

UserRoutes.route( '/forgetPwd' ).post( isAuthenticated, forgetPassword );

UserRoutes.route( '/forgetPwd/:token' ).put( isAuthenticated, resetPassword );

UserRoutes.route( '/logout' ).get( isAuthenticated, LogOutuser );

UserRoutes.route( '/userProfile' ).get( isAuthenticated,  userProfile );

UserRoutes.route( '/updatePassword' ).put( isAuthenticated,  updatePassword );

UserRoutes.route( '/UserProfile/update' ).put( isAuthenticated,  updateUserProfile );

UserRoutes.route( '/admin/alluser' ).get( isAuthenticated, authorizedRoles("admin"), AllUser );

UserRoutes.route( '/admin/User/:id' )
.get(isAuthenticated, authorizedRoles("admin"), getSingleUser)
.put(isAuthenticated, authorizedRoles("admin"), updateUserRole)
.delete( isAuthenticated, authorizedRoles("admin"), deleteUser );


module.exports =UserRoutes;
