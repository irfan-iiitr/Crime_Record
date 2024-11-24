'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <header className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg mb-2">
      <div className="flex items-center space-x-2">
        <Image src="/logo.jpg" alt="Logo" width={36} height={36} />
        <span className="text-lg font-semibold tracking-wide">CriminalRecords</span>
      </div>
      <nav className="space-x-6 flex items-center">
        <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Home</a>
        <a href="/add-record" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Add Record</a>
        <a href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">View Records</a>
        <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Contact</a>
        <button
          onClick={toggleDarkMode}
          className="ml-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
} 