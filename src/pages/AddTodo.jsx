import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import { AppContext } from '../context/AppContext';

export default function AddTodo() {
  const navigate = useNavigate();
  const { backendUrl, getTodos } = useContext(AppContext);

  const handleCreateTodo = async ({ title, description }) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/todos`, {
        title,
        description,
      });

      if (data.success) {
        await getTodos();
        navigate('/');
      } else {
        alert(data.message || 'Failed to create todo');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      alert(error.response?.data?.message || 'Failed to create todo');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-icy-aqua-400 hover:text-icy-aqua-300 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-slate-50 tracking-tight">
          Create New Todo
        </h1>
        <p className="mt-1 text-sm text-blue-slate-400">
          Add details for a new task in your schedule.
        </p>
      </div>

      <TodoForm buttonText="Add Todo" onSubmit={handleCreateTodo} />
    </div>
  );
}
