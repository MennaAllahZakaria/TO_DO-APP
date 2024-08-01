const{check,body}=require("express-validator");

const Task=require('../../models/tasksModel');
const validatorMiddleware=require("../../middlewares/validatorMiddleware");


exports.createTaskValidator=[
    check('title')
        .notEmpty().withMessage('Task title is required')
        .isLength({min:3}).withMessage('Too short task title ')
        .isLength({max:50}).withMessage('Too long task title '),

    check('description')
        .notEmpty().withMessage('Task description is required'),

    check('userId')
        .notEmpty().withMessage("user id is required")
        .isMongoId().withMessage('Invalid User id format'),

    check('dueDate')
        .optional()
        .isISO8601().withMessage('Invalid date format')

        ,validatorMiddleware
    ];

exports.getTaskValidator=[
    check('id')
        .notEmpty().withMessage("id is required")
        .isMongoId().withMessage('Invalid Task id format')
        
        ,validatorMiddleware
    
];

exports.updateTaskValidator=[
    check('id')
        .notEmpty().withMessage("id is required")
        .isMongoId().withMessage('Invalid Task id format'),
    check('title')
        .optional()
        .isLength({min:3}).withMessage('Too short task title ')
        .isLength({max:50}).withMessage('Too long task title '),

    check('description')
        .optional(),

    check('userId')
        .optional()
        .isMongoId().withMessage('Invalid User id format'),
    check('dueDate')
        .optional()
        .isISO8601().withMessage('Invalid date format'),

    validatorMiddleware
    ];

exports.deleteTaskValidator=[
    check('id')
        .notEmpty().withMessage("id is required")
        .isMongoId().withMessage('Invalid Task id format'),
        
    validatorMiddleware
    ]