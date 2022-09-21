const ayscErrorHandler=require('../middleware/ayscErrorHandler');
const ErrorHandler = require('../middleware/errorhandler');
const { sendjwtToken } = require('../middleware/jwtToken');
const crypto=require('crypto')
const UserSchema=require('../model/user');
const sendEmail = require('../middleware/SendEmail');
const cloudinary = require("cloudinary");
//Create User/ signup

exports.Createuser= ayscErrorHandler( async(req,res,next) => {
     
          const {name,email,password,avatar,confirmPassword}=req.body;
          if(req.body.password===req.body.confirmPassword){
            new ErrorHandler("password and confirmPassword not match",201)
          }
         else if( !req.body.email  ||  !req.body.password ) {
            new ErrorHandler("req.body is wrong",201)
          }

          const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
       

const user=   await  UserSchema.create({name,password,email,
  avatar: {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  },
});
sendjwtToken(user,res,200);
})

//Create User  login

exports.Loginuser=ayscErrorHandler( async(req,res,next) => {
  const { email, password }=req.body;
 
  
  if( !req.body.email  ||  !req.body.password ) {

    return next(  new ErrorHandler("enter correct email or pwd",201))
  }

const user= await  UserSchema.findOne({ email }).select("+password");

if(!user) {
  return next(  new ErrorHandler("enter correct email or pwd",401))
  }

const userpwdcomp =await user.comparepassword( password );

if( !userpwdcomp ) {
  return next(  new ErrorHandler("enter correct email or pwd ",401))
  }
  sendjwtToken(user,res,200);
})

//Logout user

exports.LogOutuser=ayscErrorHandler( async(req,res,next) => {

    res.cookie('token',null,{expires: new Date(0)}); 
  res.json({
    success:200,
    
  })
})



//forget Pwd
exports.forgetPassword=ayscErrorHandler( async(req,res,next) => {

  const { email, password }=req.body;

  const user=await UserSchema.findOne({email});

  if(!user){return next(new ErrorHandler("User not found "))}
  const resettoken= user.getResetPwdToken();


  await user.save({validateBeforeSave:false});

  const resetPwdUrl= `${req.protocol}://${req.get("host")}/account//forgetPwd/${resettoken}`
  
  const message=` Your password reset token is :-  \n\n ${resetPwdUrl} \n\n if u are not request this email  then plz ignore it `;

  try{ 
    await sendEmail(user.email, "Password reset", message );
  res.json({
    success:true,
    resetPwdUrl,
    sms:`Email was sent successfully`
  
  })}catch(err){

    user.restPasswordToken=undefined;
    user.restPasswordExpire=undefined;
  
  await user.save({validateBeforeSave:false});
  return next(new ErrorHandler(err.message,500))
  }
  })
//Reset password
  exports. resetPassword=ayscErrorHandler( async(req,res,next) => {

    const resetPwdTOken= crypto.createHash("sha256").update(req.params.token).digest("hex");
   const User= await UserSchema.findOne({resetPwdTOken,restPasswordExpire:{$gt:Date.now()}});
   if(!User) {
    return next(new ErrorHandler("reset pwd is expired",400))
  }

   if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password and confirm password not same",400))

   }
   User.password=req.body.password;
   User.restPasswordToken=undefined;
   User.restPasswordExpire=undefined;

   await User.save({validateBeforeSave:false});

   const message=`Password Change ", "Your Passwordchange successfully\n\n if u are not then change 
   the password as soon as possible through this link  ${req.protocol}://${req.get("host")}/account/login`;
    await sendEmail(User.email, "Password Change", message );

    res.json({
      success:true,
      resetPwdTOken,
      token:req.params.token,
     new_Password:User.password    
    })



  })

  //update user password
  exports. updatePassword=ayscErrorHandler( async(req,res,next) => {

    const user = await UserSchema.findById(req.user.id).select("+password");
 const ispasswordmatched= await user.comparepassword(req.body.oldPassword);

if (req.body.newPassword !=  req.body.confirmNewPassword){
  return next(new ErrorHandler("new password and confirm new password are not matched ",400))
}
 if(!ispasswordmatched){return next(new ErrorHandler("old password is wrong ",400))};

 user.password=req.body.newPassword;
user.save();
    res.json({
     success:true,
     user
    })
 })

 //user profile
 exports. userProfile=ayscErrorHandler( async(req,res,next) => {

  const user = await UserSchema.findById(req.user?.id);
  res.json({
   success:true,
   user
  })
})

 //update user profile
 exports. updateUserProfile=ayscErrorHandler( async(req,res,next) => {
const newUserData={
  name:req.body.name,
  email:req.body.email,
}

  const user = await UserSchema.findById(req.user.id,newUserData,{ 
    new:true,
    runValidators:true,
    useFinfAndModify:false,
  });
  res.json({
   success:true,
   user
  })
})

 //All user profile admin
 exports. AllUser=ayscErrorHandler( async(req,res,next) => {

  const user = await UserSchema.find();
  res.json({
   success:true,
   user
  })
})


 //single user details Admin 
 exports.getSingleUser=ayscErrorHandler( async(req,res,next) => {

  const user = await UserSchema.findById(req.params.id);
  res.json({
   success:true,
   user
  })
})

 //update user role  Admin
 exports. updateUserRole =ayscErrorHandler( async(req,res,next) => {
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
  }
  
    const user = await UserSchema.findById(req.params.id);
    user.role=req.body.role;
    user.save({validateBeforeSave:false});
    res.json({
     success:true,
     user
    })
  })

 //Delete user
 exports. deleteUser=ayscErrorHandler( async(req,res,next) => {

  const user = await UserSchema.findById(req.params.id);
  
  if(!user) {
    return next(new ErrorHandler("user not exist ",400))
  }
  
  await user.remove();

  res.json({
   success:true,
   user
  })
})