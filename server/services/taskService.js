const asyncHandler=require("express-async-handler");
const handlerFactory=require("./handlerFactory");
const ApiError = require("../utils/ApiError")

const Task=require('../models/tasksModel');

// @desc    Create task
// @route   POST  /api/v1/tasks
// @access  Private

exports.createTask=handlerFactory.createOne(Task);


// @desc    Get all tasks
// @route   GET  /api/v1/tasks
// @access  Private

exports.getAllTasks=handlerFactory.getAll(Task);

// @desc    Get one task
// @route   GET  /api/v1/tasks/:id
// @access  Private

exports.getTask=handlerFactory.getOne(Task);

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private/user

exports.updateTask=handlerFactory.updateOne(Task);

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private/user

exports.deleteTask=handlerFactory.deleteOne(Task);

// @desc    Update Task Status
// @route   PUT /api/v1/tasks/changeStatus/:id
// @access  Private/user
exports.updateTaskStatus=asyncHandler(async(req,res,next)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,
        {
            completed:req.body.status
        }
    ,   {
        new: true,
    });

    if (!task) {
        return next(
            new ApiError(`No document for this id ${req.params.id}`, 404)
        );
    }
    res.status(200).json({data:task});
 
})