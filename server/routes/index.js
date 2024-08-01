const userRoute=require('./userRoute');
const taskRoute=require('./taskRoute');

const mountRoutes=(app)=>{
    app.use('/api/users',userRoute);
    app.use('/api/tasks',taskRoute);
}

module.exports=mountRoutes;