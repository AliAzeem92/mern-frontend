import React, { useState, useEffect } from 'react';

export default function TodoForm({
  initialData = { title: '', description: '' },
  buttonText = 'Add Todo',
  onSubmit,
}) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData?.title) setTitle(initialData.title);
    if (initialData?.description) setDescription(initialData.description);
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please enter both a title and description.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (onSubmit) {
        await onSubmit({ title, description });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-slate-900 border border-blue-slate-800 rounded-xl p-6 shadow-sm"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-blue-slate-300 mb-2"
          >
            Todo Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Implement backend authentication"
            required
            className="w-full px-4 py-2.5 rounded-lg bg-blue-slate-800 border border-blue-slate-700 text-blue-slate-50 placeholder-blue-slate-500 focus:outline-none focus:ring-2 focus:ring-icy-aqua-500/50 focus:border-icy-aqua-500 shadow-sm transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-blue-slate-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide additional details or notes..."
            required
            className="w-full px-4 py-2.5 rounded-lg bg-blue-slate-800 border border-blue-slate-700 text-blue-slate-50 placeholder-blue-slate-500 focus:outline-none focus:ring-2 focus:ring-icy-aqua-500/50 focus:border-icy-aqua-500 shadow-sm transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 rounded-lg font-semibold text-blue-slate-950 bg-soft-cyan-500 hover:bg-soft-cyan-400 shadow-sm shadow-soft-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : buttonText}
        </button>
      </div>
    </form>
  );
}
