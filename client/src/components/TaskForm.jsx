// src/components/TaskForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './TaskStyles.css';
const API_URL = import.meta.env.VITE_API_URL;


const TaskForm = ({ taskToEdit, onTaskAddedOrUpdated }) => {
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    dueDate: Yup.date().required('Due date is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: taskToEdit ? taskToEdit.title : '',
      description: taskToEdit ? taskToEdit.description : '',
      dueDate: taskToEdit ? taskToEdit.dueDate.split('T')[0] : '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (taskToEdit) {
          // Update task
          await axios.put(`${API_URL}/api/tasks/${taskToEdit._id}`, values, {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          });
        } else {
          // Create new task
          await axios.post(`${API_URL}/api/tasks`, values, {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          });
        }
        resetForm();
        onTaskAddedOrUpdated(); // Notify parent component about the task update
      } catch (err) {
        setError('Failed to save task');
      }
    },
  });

  useEffect(() => {
    if (taskToEdit) {
      formik.setValues({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate.split('T')[0],
      });
    }
  }, [taskToEdit]); // Ensure useEffect only runs when taskToEdit changes

  return (
    <div className="card mb-4 shadow-sm border-light">
      <div className="card-body">
        <h5 className="card-title mb-3 text-primary">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              {...formik.getFieldProps('description')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              className="form-control"
              {...formik.getFieldProps('dueDate')}
            />
            {formik.touched.dueDate && formik.errors.dueDate ? (
              <div className="text-danger">{formik.errors.dueDate}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
