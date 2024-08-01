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
    createTaskValidator,
    getTaskValidator,
    updateTaskValidator,
    deleteTaskValidator


}=require('../utils/validators/taskValidator')

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
                    createTaskValidator,
                    createTask
                );

router.route('/:id')
                    .get(
                        getTaskValidator,
                        getTask
                    )
                    .put(
                        updateTaskValidator,
                        updateTask
                    )
                    .delete(
                        deleteTaskValidator,
                        deleteTask
                    );

router.put('/changeStatus/:id',updateTaskStatus)
                    



module.exports=router;