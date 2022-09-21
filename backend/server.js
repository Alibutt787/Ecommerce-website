const app=require('./app');
const dotenv = require('dotenv');
const databaseConnect=require('./config/database');
const ErrorHandler = require('./middleware/error');
const cloudinary =require('cloudinary');



//to caught errors of log(..something...)
    process.on('uncaughtException', function (err) {

    // Handle the error safely
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})
// configure the path of .env file 
    dotenv.config({path:"./config/config.env"});

// connect database 
    databaseConnect();
    
    //config cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });



// Run Server 
    const server=app.listen(process.env.PORT,(err)=>{

    if(err) console.log(`Server has problem ${err}`);
    console.log(`Server is Running ${process.env.PORT}`);
});


//unhandle promise rejection like if database connection string wrong
    process.on('unhandledRejection', (err) => {
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to unhandle promise`);
// Application specific logging, throwing an error, or other logic here
    server.close(()=>{
    process.exit(1);}); 
});
    app.use(ErrorHandler);    
    


