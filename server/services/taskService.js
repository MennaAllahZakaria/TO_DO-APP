const asyncHandler=require("express-async-handler");
const handlerFactory=require("./handlerFactory");
const ApiError = require("../utils/ApiError")

const Task=require('../models/tasksModel');

// @desc    Create task
// @route   POST  /api/tasks
// @access  Private/user

exports.createTask=asyncHandler(async(req,res,next)=>{
    const newTask= await Task.create({
        title:req.body.title,
        description:req.body.description,
        dueDate:req.body.dueDate,
        completed:req.body.completed || false,
        createdAt:Date.now(),
        updatedAt:Date.now(),
        userId:req.user._id
    })
    res.status(201).json(newTask);
})

// @desc    Get all tasks for logged user
// @route   GET  /api/tasks
// @access  Private/user

exports.getAllTasksForLoggedUser=asyncHandler(async(req,res,next)=>{
    const tasks=await Task.find({userId:req.user._id});
    res.status(201).json({Results:tasks.length,data: tasks});
});
// @desc    Get late tasks
// @route   Get /api/tasks/late
// @access  Private/user

exports.getLateTasks=asyncHandler(async(req,res,next)=>{
    const today=new Date();
    today.setHours(0,0,0,0);
    const lateTasks=await Task.find({dueDate:{$lt:today},completed:false,userId:req.user._id});

    res.status(201).json({Results:lateTasks.length,data: lateTasks});
})

// @desc    Get today tasks
// @route   Get /api/tasks/today
// @access  Private/user

exports.getTodayTasks = asyncHandler(async (req, res, next) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today (midnight)
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    const todayTasks = await Task.find({
        dueDate: {
            $gte: today,     // Greater than or equal to today at midnight
            $lt: tomorrow    // Less than tomorrow at midnight
        },
        userId: req.user._id
    });

    res.status(200).json({ Results: todayTasks.length, data: todayTasks });
});

// @desc    Get completed tasks
// @route   GET  /api/tasks/completed
// @access  Private/user

exports.getCompletedTasks=asyncHandler(async(req,res,next)=>{
    const completedTasks=await Task.find({completed:true,userId:req.user._id});

    if ( !completedTasks ){
        return next(new ApiError('No completed tasks found', 404));
    }
    res.status(201).json({Results:completedTasks.length,data: completedTasks});
})

// @desc    Get one task
// @route   GET  /api/tasks/:id
// @access  Private/user

exports.getTask=handlerFactory.getOne(Task);

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private/user

exports.updateTask=handlerFactory.updateOne(Task);

// @desc    Update Task Status
// @route   PUT /api/tasks/changeStatus/:id
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

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private/user

exports.deleteTask=handlerFactory.deleteOne(Task);

// @desc    Delete all tasks of logged user
// @route   DELETE /api/tasks
// @access  Private/user

exports.deleteAllTasks=asyncHandler(async(req,res,next)=>{
    await Task.deleteMany({userId:req.user._id});
    res.status(200).json({message:"All tasks deleted successfully"});

});


