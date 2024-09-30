import Link from 'next/link';

const Home = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1620287341260-a9ecadfe7a17?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background Image" className="object-cover object-center w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to My Blog App</h1>
        <p className="text-lg text-gray-300 mb-8">Blogging is to writing what extreme sports are to athletics: more free-form, more accident-prone, less formal, more alive.</p>
        <Link className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" href="/blog">View Blogs
        </Link>
      </div>
    </div>
  );
};

export default Home;
