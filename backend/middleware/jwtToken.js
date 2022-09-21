
exports.sendjwtToken=(user,res,statusCode)=>{

    const token= user.getJWTToken();
    const options = {
        expires: new Date(
          Date.now() +process.env.COOKIE_EXPIRE *24* 24 * 60 * 60 * 1000 ),
        httpOnly: true,
        sameSite:'lax',
        secure: false,
        domain: "localhost",
      };
     
 res.cookie("token",token,options);

 res.status(statusCode) .json({
  status:200,
  token,
});

}