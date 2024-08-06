const express=require('express');

const router=express.Router();


const {
    createTask,
    getAllTasksForLoggedUser,
    getLateTasks,
    getTodayTasks,
    getCompletedTasks,
    getTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    deleteAllTasks,
    
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



router.get('/completed',getCompletedTasks);

router.get('/late',getLateTasks);

router.get('/today',getTodayTasks);

router.put('/changeStatus/:id',updateTaskStatus)
                    
router.route('/')
                .get(
                    getAllTasksForLoggedUser
                )
                .post(
                    createTaskValidator,
                    createTask
                ).delete(
                    deleteAllTasks
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



module.exports=router;