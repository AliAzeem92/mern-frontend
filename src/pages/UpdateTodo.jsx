import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import { AppContext } from '../context/AppContext';

export default function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, getTodos } = useContext(AppContext);

  const [todoData, setTodoData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  // Fetch the todo by ID
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/todos/${id}`);
        if (data.success && data.todo) {
          setTodoData({
            title: data.todo.title,
            description: data.todo.description,
          });
        }
      } catch (error) {
        console.error('Error fetching todo:', error);
        alert(error.response?.data?.message || 'Todo not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id, backendUrl]);

  const handleUpdateTodo = async ({ title, description }) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/todos/${id}`, {
        title,
        description,
      });

      if (data.success) {
        await getTodos();
        navigate('/');
      } else {
        alert(data.message || 'Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      alert(error.response?.data?.message || 'Failed to update todo');
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
          Update Todo
        </h1>
        <p className="mt-1 text-sm text-blue-slate-400">
          Modify the task details below.
        </p>
      </div>

      {loading ? (
        <div className="bg-blue-slate-900 border border-blue-slate-800 rounded-xl p-8 text-center text-blue-slate-400">
          Loading todo details...
        </div>
      ) : (
        <TodoForm
          initialData={todoData}
          buttonText="Update"
          onSubmit={handleUpdateTodo}
        />
      )}
    </div>
  );
}
