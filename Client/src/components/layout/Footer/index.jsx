import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-3">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/images/svg/logo-black.svg" className="w-[10rem] h-[10rem]" alt="Bac Mart Logo" />
          </Link>
          <ul className="flex flex-wrap items-center mb-2 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-4">
            <li>
              <Link to='/' className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to='/about' className="hover:underline">About Us</Link>
            </li>
            <li>
              <Link to='/contact' className="hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Bac Mart</a> | All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
