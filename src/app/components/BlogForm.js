'use client';
import { useState } from 'react';

export default function BlogForm({ addBlog, editBlog, setEditBlog }) {
  const [title, setTitle] = useState(editBlog?.title || '');
  const [desc, setDesc] = useState(editBlog?.desc || '');
  const [img, setImg] = useState(editBlog?.img || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { id: editBlog?.id || Date.now(), title, desc, img };

    if (editBlog) {
      addBlog(blog, true);
      setEditBlog(null);
    } else {
      addBlog(blog);
    }

    setTitle('');
    setDesc('');
    setImg('');
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editBlog ? 'Edit Blog' : 'Add New Blog'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Title input */}
        <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Enter blog title"
  className="w-full p-2 border rounded bg-white text-black font-medium placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
  required
/>

        {/* Description textarea */}
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Write your blog content"
          className="w-full p-2 border rounded bg-white text-gray-900 placeholder:text-gray-600 placeholder:font-medium focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
          rows={4}
        />

        {/* Image URL input */}
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full p-2 border rounded bg-white text-gray-900 placeholder:text-gray-600 placeholder:font-medium focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500"
        >
          {editBlog ? 'Update Blog' : 'Add Blog'}
        </button>

        {/* Cancel button for edit mode */}
        {editBlog && (
          <button
            type="button"
            onClick={() => {
              setEditBlog(null);
              setTitle('');
              setDesc('');
              setImg('');
            }}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
