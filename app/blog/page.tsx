import React from 'react';
import Link from 'next/link';

 const BlogList = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }

        const blogs = await res.json();

        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-end">
                    <Link href="/blog/new" className="cursor-pointer mt-2 border hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white shadow-md rounded-md py-2.5 px-3 w-52 lg:mx-0 flex justify-center font-semibold transition-all duration-300 hover:bg-gray-100">
                        Create New Blog
                    </Link>
                </div>

                <h1 className="text-3xl font-bold my-4">Blogs</h1>
                <ul>
                    {blogs.map((blog: { id: string; title: string }) => (
                        <li key={blog.id} >
                            <Link className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white rounded-md border shadow-md mt-3" href={`/blog/${blog.id}`}>{blog.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );

    } catch (error: any) {
        console.error(error); // Log error to the console
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">Error loading blogs</h1>
                <p>{error.message}</p>
            </div>
        );
    }
};

export default BlogList;
