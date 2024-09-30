import React from 'react';
import { notFound } from 'next/navigation';
import { fetchBlogById } from '@/app/api/posts/route';


const BlogDetail = async ({ params }: { params: { id: string } }) => {
    const blog: any = await fetchBlogById(params.id);

    if (!blog) {
        notFound();
    }

    return (
        <section className="pt-8 px-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img className="mr-4 w-16 h-16 rounded-full" src="https://avatars.githubusercontent.com/u/137566252?v=4" alt="Jese Leos"/>
                            <div>
                                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Hamza Waheed</a>
                            <p className="text-base text-gray-500 dark:text-gray-400">🎓 Pursuing Master's @ FAST | Cloud GenAI Engineer</p>
                            </div>
                    </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog.title}</h1>
            </header>
            {blog.imageUrl && (
                <img
                    className="w-full h-auto mb-4 rounded-md"
                    src={blog.imageUrl}
                    alt={blog.title}
                />
            )}
            <p className="leading">{blog.content}</p>
        </section>


    );
};

export default BlogDetail;
