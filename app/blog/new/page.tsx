'use client'; // Enable client-side rendering for this component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content || !image) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);

        const res = await fetch('/api/posts', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            const { id } = await res.json();
            router.push(`/blog/${id}`); // Redirect to the new blog post
        } else {
            console.error("Failed to create blog post");
        }
    };
    return (
        <div className="mt-5 p-8">
            <h1 className="text-3xl font-bold">Create New Blog</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div>
                    <label className="block text-gray-200">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-200">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows={5}
                        required
                    ></textarea>
                </div>
                <div className="mt-4">
                    <label htmlFor="image" className="block text-sm font-medium">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files![0])}
                        className="mt-1 block w-full border rounded-md p-2"
                        required
                    />
                </div>

                <button type="submit" className="cursor-pointer mt-2 border hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white shadow-md rounded-md lg:mx-0 flex justify-center font-semibold transition-all p-3 duration-300 hover:bg-gray-100">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewBlog;
