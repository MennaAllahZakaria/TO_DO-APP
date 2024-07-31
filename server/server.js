const express=require("express");
const morgan=require("morgan");
require('dotenv').config();

const dbConnection=require('./config/database');
const ApiError=require("./utils/ApiError");
const globalError=require('./middlewares/errorMiddleware');

const app=express();
app.use(express.json());
app.use(globalError);

// connect to DB

dbConnection();
const PORT=process.env.PORT|| 5000;

if ( process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`);
}

app.all('*',(req,res,next)=>{
    // create error and send it to error handling middleware
        next(new ApiError(`cannot find this route : ${req.originalUrl}`,400))
    });

const server= app.listen(PORT,()=>{
    console.log(`App Running on port ${PORT}`);
});



// Handle Rejections outside express
process.on("unhandledRejection",(err)=>{
    console.log(`UnhandledRejection Errors: ${err}`);
    server.close(()=>{
        console.error('Shutting Down...');
        process.exit(1);
    })
    
})