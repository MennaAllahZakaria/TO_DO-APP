const express=require('express');

const router=express.Router();


const {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    
    
}=require("../services/taskService");

const{
    protect,
    allowedTo
}=require("../services/authService");

router.use(protect,allowedTo('user'));




router.route('/')
                .get(
                    getAllTasks
                )
                .post(
                    createTask
                );

router.route('/:id')
                    .get(
                        getTask
                    )
                    .put(
                        updateTask
                    )
                    .delete(
                        deleteTask
                    );

router.put('/changeStatus/:id',updateTaskStatus)
                    



module.exports=router;