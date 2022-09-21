const mongoose =require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto=require('crypto')
const UserSchema=mongoose.Schema({
name:{
       type:String,
       required:[true,"Enter user name "],
       maxLength:[20,"name cannot greater than 20 Characters"],
       minLength:[4,"name cannot smaller than 4 Characters"],

},
email:{
    type:String,
       required:[true,"plz enter email"],
       unique:true,
       validate:[validator.isEmail,'plz enter valid email'],
},
password:{
    type:String,
    required:[true,"plz enter password"],
    minLength:[6,"password  greater than 6 Characters"],
    select:false,
},
avatar:{
    public_id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    }
},

role:{
    type:String,
    default:"user",
},restPasswordToken:String,
restPasswordExpire:Date,
});

UserSchema.pre("save",async function(next){

    if(!this.isModified("password")) {
        next();
    }
   this.password= await bcrypt.hash(this.password,10);
});


UserSchema.methods.getJWTToken = function() {
    return jwt.sign( {id:this}, process.env.jwt_Sceret,  {
        expiresIn:process.env.jwt_Expire_Token
    })
}

UserSchema.methods.comparepassword =async function(enterpassword) {
  return await bcrypt.compare(enterpassword,this.password);
}


UserSchema.methods.getResetPwdToken=function () {

    //Generating and adding resetpasswordToken to userSchema
    const ResetToken =crypto.randomBytes(20).toString("hex");
    console.log(ResetToken);
    
    // Hashing and adding resetPasswordToken to userSchema

    this.restPasswordToken=crypto.createHash("sha256").update(ResetToken).digest("hex");

    this.restPasswordExpire= Date.now()+15*60*1000;

    return ResetToken;

}

module.exports=mongoose.model("User",UserSchema);

