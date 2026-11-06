import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit3, Calendar } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

export default function TodoCard({ todo }) {
  const { backendUrl, getTodos } = useContext(AppContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const isCompleted = todo?.completed;

  // Toggle todo completion
  const handleToggleDone = async () => {
    try {
      setIsUpdating(true);
      const { data } = await axios.put(`${backendUrl}/api/todos/${todo._id}`, {
        completed: !isCompleted,
      });

      if (data.success) {
        await getTodos();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      alert(error.response?.data?.message || 'Failed to update todo');
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete todo
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const { data } = await axios.delete(`${backendUrl}/api/todos/${todo._id}`);
      if (data.success) {
        await getTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert(error.response?.data?.message || 'Failed to delete todo');
    }
  };

  const formattedDate = todo?.createdAt
    ? new Date(todo.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div
      className={`rounded-xl p-5 bg-blue-slate-900 transition-all ${
        isCompleted
          ? 'border border-ocean-mist-700'
          : 'border border-blue-slate-800 hover:border-blue-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={Boolean(isCompleted)}
            onChange={handleToggleDone}
            disabled={isUpdating}
            className="mt-1 h-5 w-5 rounded border-blue-slate-700 bg-blue-slate-800 accent-aquamarine-500 cursor-pointer focus:ring-icy-aqua-500 disabled:opacity-50"
          />
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold tracking-tight transition-colors ${
                isCompleted
                  ? 'line-through text-blue-slate-500'
                  : 'text-blue-slate-50'
              }`}
            >
              {todo?.title}
            </h3>
            <p
              className={`mt-1.5 text-sm leading-relaxed ${
                isCompleted ? 'text-blue-slate-500' : 'text-blue-slate-400'
              }`}
            >
              {todo?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/update/${todo?._id}`}
            className="p-2 rounded-lg border border-ocean-mist-500 text-ocean-mist-400 hover:bg-ocean-mist-900 transition-colors inline-flex items-center justify-center"
            title="Edit Todo"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 rounded-lg text-blue-slate-400 hover:text-aquamarine-300 hover:bg-aquamarine-950/40 transition-colors inline-flex items-center justify-center cursor-pointer"
            title="Delete Todo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-blue-slate-800 flex items-center gap-1.5 text-xs text-blue-slate-400">
        <Calendar className="w-3.5 h-3.5 text-blue-slate-400" />
        <span>Created: {formattedDate}</span>
      </div>
    </div>
  );
}
