const userRoute=require('./userRoute');
const taskRoute=require('./taskRoute');
const authRoute=require('./authRoute')

const mountRoutes=(app)=>{
    app.use('/api/users',userRoute);
    app.use('/api/tasks',taskRoute);
    app.use('/api/auth',authRoute);
}

module.exports=mountRoutes;