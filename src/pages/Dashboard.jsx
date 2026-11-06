import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ListTodo } from 'lucide-react';
import TodoCard from '../components/TodoCard';
import { AppContext } from '../context/AppContext';

export default function Dashboard() {
  const { todos, getTodos, loading } = useContext(AppContext);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-slate-50 tracking-tight">
            My Todo Tasks
          </h1>
          <p className="mt-1 text-sm text-blue-slate-400">
            Keep track of your daily tasks and workflow.
          </p>
        </div>

        <Link
          to="/add"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-soft-cyan-500 hover:bg-soft-cyan-400 text-blue-slate-950 transition-colors shadow-sm shadow-soft-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </Link>
      </div>

      {/* Todo List / Grid */}
      {todos && todos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-blue-slate-900 border border-blue-slate-800 rounded-xl p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-blue-slate-800 text-icy-aqua-400 flex items-center justify-center mx-auto mb-4">
            <ListTodo className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-blue-slate-50 mb-1">
            No todos yet
          </h2>
          <p className="text-sm text-blue-slate-400 mb-6">
            You don't have any tasks scheduled. Start by creating your first todo item.
          </p>
          <Link
            to="/add"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-soft-cyan-500 hover:bg-soft-cyan-400 text-blue-slate-950 transition-colors shadow-sm shadow-soft-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Todo</span>
          </Link>
        </div>
      )}
    </div>
  );
}
