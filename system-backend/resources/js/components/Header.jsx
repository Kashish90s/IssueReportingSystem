import React, { useState } from "react";
import ReactDOM from 'react-dom/client';

export default function Header() {
  const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-white font-poppins">
        <div className="max-w-9xl mx-auto flex justify-between">
          <div className="">
            <a href="#" className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hamro Neighbourhood</a>
          </div>
          <div className="hidden sm:flex flex-grow justify-end font-medium">
            <a href="#" className="text-black mr-4 hover:text-gray-400 hover:-translate-y-0.5 transform transition focus:text-gray-400 active:text-gray-400">Report a Problem</a>
            <a href="#" className="text-black mr-4 hover:text-gray-400 hover:-translate-y-0.5 transform transition focus:text-gray-400">All reports</a>
            <a href="#" className="text-black mr-4 hover:text-gray-400 hover:-translate-y-0.5 transform transition focus:text-gray-400">Help</a>
            <a href="#" className="text-black mr-4 hover:text-gray-400 hover:-translate-y-0.5 transform transition focus:text-gray-400">Profile</a>
            <a href="#" className="text-black mr-4 hover:text-gray-400 hover:-translate-y-0.5 transform transition focus:text-gray-400">Login/SignUp</a>
          </div>
          <div className="sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden mt-2 font-normal">
            <a href="#" className="block text-black py-2 px-4">Report a Problem</a>
            <a href="#" className="block text-black py-2 px-4">All reports</a>
            <a href="#" className="block text-black py-2 px-4">Help</a>
            <a href="#" className="block text-black py-2 px-4">Profile</a>
            <a href="#" className="block text-black py-2 px-4">Login/SignUp</a>
          </div>
        )}
      </nav>
    );
  }

  return (
    <div className="bg-white">
      <header className="text-center p-4">
        <NavBar />
      </header>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-200"/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('header')).render(<Header />);
