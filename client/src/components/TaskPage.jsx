import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/tasks', {
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
    setTaskToEdit(task);
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
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
      await axios.put(`http://localhost:5000/api/tasks/changeStatus/${id}`, { status: !task.completed }, {
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
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
        <h2 className="mb-4">Your Tasks</h2>

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

export default TasksPage;
