'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getItem, setItem } from '../../utils/storage';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', desc: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const isLoggedIn = getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return; // Early exit if not logged in
    }

    const storedBlogs = getItem('blogs');
    console.log('Stored Blogs:', storedBlogs); // Add logging here

    if (storedBlogs && storedBlogs.length > 0) {
      setBlogs(storedBlogs);
    } else {
      console.log('No blogs found, setting dummy blogs'); // Add logging here
      // Initialize with 5 dummy blogs if none exist
      const dummyBlogs = [
        {
          id: 1,
          title: 'First Blog Post',
          desc: 'This is an example blog post. Edit or delete it to get started!',
          image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        },
        {
          id: 2,
          title: 'Second Blog Post',
          desc: 'Here is another blog post. Start editing or adding more blogs!',
          image: 'https://images.unsplash.com/photo-1502791312441-601b5a4d19b8?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDkxfHxibG9nJTIwcG9zdHxlbnwwfDB8fHxl8',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        },
        {
          id: 3,
          title: 'Third Blog Post',
          desc: 'This post is an example of third blog post content.',
          image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDZ8fGJsb2dfcG9zdHxlbnwwfDB8fHxl8',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        },
        {
          id: 4,
          title: 'Fourth Blog Post',
          desc: 'The fourth blog post example is here. It also comes with an image.',
          image: 'https://images.unsplash.com/photo-1581795407897-d4ac1c153946?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDJ8fGJsb2dfYmxvZ3xlbnwwfDB8fHxl8',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        },
        {
          id: 5,
          title: 'Fifth Blog Post',
          desc: 'Final blog post to complete the list of dummy blogs.',
          image: 'https://images.unsplash.com/photo-1592394813859-00fc6ef960f5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg1MnwwfDF8c2VhcmNofDQzfGJsb2dfcG9zdHxlbnwwfDB8fHxl8',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }
      ];
      setBlogs(dummyBlogs);
      setItem('blogs', dummyBlogs);
    }
  }, [router]);

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === editingId
          ? { ...blog, ...newBlog }
          : blog
      );
      setBlogs(updatedBlogs);
      setItem('blogs', updatedBlogs);
    } else {
      const newBlogWithId = {
        ...newBlog,
        id: blogs.length + 1,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      const updatedBlogs = [...blogs, newBlogWithId];
      setBlogs(updatedBlogs);
      setItem('blogs', updatedBlogs);
    }
    setNewBlog({ title: '', desc: '', image: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    setItem('blogs', updatedBlogs);
  };

  const logout = () => {
    removeItem('isLoggedIn');
    router.push('/login');
  };

  // Render the JSX
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Blog</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Blog Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          <form onSubmit={handleAddBlog} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full p-2 border rounded bg-white text-black font-medium placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter blog title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newBlog.desc}
                onChange={(e) => setNewBlog({ ...newBlog, desc: e.target.value })}
                className="w-full p-2 border rounded bg-white text-gray-900 placeholder:text-gray-600 placeholder:font-medium focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Write your blog content"
                rows={4}
                required
              />
            </div>
            {/* Image URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={newBlog.image}
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                className="w-full p-2 border rounded bg-white text-gray-900 placeholder:text-gray-600 placeholder:font-medium focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-xs text-blue-500">Leave blank for default image</p>
            </div>
            <div className="flex justify-end">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNewBlog({ title: '', desc: '', image: '' });
                  }}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingId ? 'Update Blog' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>

        {/* Blog List */}
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow overflow-hidden rounded-lg">
              {/* Blog Image */}
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80';
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">Published on {blog.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(blog.id);
                        setNewBlog({
                          title: blog.title,
                          desc: blog.desc,
                          image: blog.image
                        });
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-gray-600">
                  <p>{blog.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
