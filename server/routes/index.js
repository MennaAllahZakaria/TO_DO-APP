const userRoute=require('./userRoute');
const taskRoute=require('./taskRoute');

const mountRoutes=(app)=>{
    app.use('/api/users',userRoute);
    
}

module.exports=mountRoutes;