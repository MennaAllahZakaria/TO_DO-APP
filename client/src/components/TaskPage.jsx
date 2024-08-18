import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import AuthHOC from './AuthHOC';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showSuccessToast,showErrorToast,showWarningToast} from './toastUtils'

const API_URL = import.meta.env.VITE_API_URL;
const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      const url = filter === 'all' 
        ? `${API_URL}/api/tasks/` 
        : `${API_URL}/api/tasks/${filter}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.data || []);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized, please log in');
      } else {
        setError('Failed to load tasks');
      }
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    showWarningToast('Task edit successfully')
    setTaskToEdit(task);
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showErrorToast('Task deleted successfully')
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleDeleteAllTasks = async () => {
    if ( tasks.length === 0) {
      showWarningToast("No tasks to deleted")
      return;
    }
    if (window.confirm('Are you sure you want to delete all tasks')){
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }
        await axios.delete(`${API_URL}/api/tasks/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchTasks()
        showErrorToast('All Tasks deleted successfully')
        
      } catch (err) {
        setError('Failed to delete task');
      }
    }
    
  };

  const handleToggleComplete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      const task = tasks.find(t => t._id === id);
      await axios.put(`${API_URL}/api/tasks/changeStatus/${id}`, { status: !task.completed }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleTaskAddedOrUpdated = () => {
    fetchTasks();
    setTaskToEdit(null);
    showSuccessToast('Task created or updated successfully');
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Tasks</h2>

      {/* Filter Buttons */}
      <div className="mb-3">
        <button className="btn btn-primary mr-2" onClick={() => handleFilterChange('all')}>
          All
        </button>
        <button className="btn btn-success mr-2" onClick={() => handleFilterChange('completed')}>
          Completed
        </button>
        <button className="btn btn-danger mr-2" onClick={() => handleFilterChange('late')}>
          Late
        </button>
        <button className="btn btn-warning" onClick={() => handleFilterChange('today')}>
          Today
        </button>
      </div>

      <div className="mb-3">
        <button className="btn btn-danger mr-" onClick={() => handleDeleteAllTasks()}>
          Delete All Tasks
        </button>
      </div>

      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        ))
      ) : (
        <p>No tasks found.</p>
      )}
      <TaskForm taskToEdit={taskToEdit} onTaskAddedOrUpdated={handleTaskAddedOrUpdated} />
    </div>
  );
};

// Wrap the component with AuthHOC before exporting
export default AuthHOC(TasksPage);
