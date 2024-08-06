// src/components/TaskItem.jsx
import React from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './TaskItem.css'; // Import the CSS file

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div
      className={`card mb-3 ${task.completed ? 'completed-task' : 'incomplete-task'}`}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">
            {task.title} {task.completed && <FaCheck className="text-success" />}
          </h5>
          <p className="card-text">{task.description}</p>
          <p className="card-text">
            <small className="text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</small>
          </p>
        </div>
        <div>
          <button className="btn btn-primary me-2" onClick={() => onEdit(task)}>
            <FaEdit />
          </button>
          <button className="btn btn-danger me-2" onClick={() => onDelete(task._id)}>
            <FaTrash />
          </button>
          <button
            className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
            onClick={() => onToggleComplete(task._id)}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
