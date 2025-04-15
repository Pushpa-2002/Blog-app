'use client';

export default function BlogList({ blogs, deleteBlog, setEditBlog }) {
  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white p-4 rounded shadow">
          {blog.img && (
            <img 
              src={blog.img} 
              alt={blog.title} 
              className="w-full h-48 object-cover mb-3 rounded  text-gray-800 font-medium placeholder:text-gray-500"
            />
          )}
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-gray-700 my-2">{blog.desc}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditBlog(blog)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteBlog(blog.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}