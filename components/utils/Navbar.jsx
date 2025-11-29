'use client'
import Link from 'next/link';
import React from 'react';
import {useCart} from '@/context/cartContext'
import Sidebar from './Sidebar';

function Navbar() {
  const {cartItems} = useCart()
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-white via-white to-gray-200 shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <img
          src="https://www.casemandu.com.np/_next/image?url=%2Fimages%2Flogo%2Flogo.jpg&w=256&q=75"
          alt="logo"
          className="h-12 md:block hidden object-contain"
        />
        <h1 className="md:text-2xl text-xl font-bold text-black uppercase 
          font-poppins
        ">
         Customise
        </h1>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <a
          href="https://www.casemandu.com.np"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-transparent border-2 border-black rounded-md text-black hover:bg-black hover:text-white transition duration-300"
        >
          <span className='md:block hidden'>
          Back to Casemandu
          </span>
          <span className='md:hidden block'>
          Main
          </span>
        </a>
        <Link href="https://www.casemandu.com.np/order/track" target='_blank' className="text-black hover:text-gray-700 transition">
        <span className='md:block hidden'>
          Track Order
          </span>
          <span className='md:hidden block'>
          Track
          </span>
        </Link>
        <Link href="/" className="text-black hover:text-gray-700 transition">
         <svg className='h-6 w-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="#000000"></path> <path fillRule="evenodd" clipRule="evenodd" d="M7.4 8.55C7.64853 8.21863 8.11863 8.15147 8.45 8.4L10.45 9.9C10.6389 10.0416 10.75 10.2639 10.75 10.5C10.75 10.7361 10.6389 10.9584 10.45 11.1L8.45 12.6C8.11863 12.8485 7.64853 12.7814 7.4 12.45C7.15147 12.1186 7.21863 11.6485 7.55 11.4L8.75 10.5L7.55 9.6C7.21863 9.35147 7.15147 8.88137 7.4 8.55Z" fill="#000000"></path> <path fillRule="evenodd" clipRule="evenodd" d="M16.6 8.55C16.3515 8.21863 15.8814 8.15147 15.55 8.4L13.55 9.9C13.3611 10.0416 13.25 10.2639 13.25 10.5C13.25 10.7361 13.3611 10.9584 13.55 11.1L15.55 12.6C15.8814 12.8485 16.3515 12.7814 16.6 12.45C16.8485 12.1186 16.7814 11.6485 16.45 11.4L15.25 10.5L16.45 9.6C16.7814 9.35147 16.8485 8.88137 16.6 8.55Z" fill="#000000"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.5303 16.5303C15.2374 16.8232 14.7626 16.8232 14.4697 16.5303L14 16.0607L13.5303 16.5303C13.3897 16.671 13.1989 16.75 13 16.75C12.8011 16.75 12.6103 16.671 12.4697 16.5303L12 16.0607L11.5303 16.5303C11.3897 16.671 11.1989 16.75 11 16.75C10.8011 16.75 10.6103 16.671 10.4697 16.5303L10 16.0607L9.53033 16.5303C9.23744 16.8232 8.76256 16.8232 8.46967 16.5303C8.17678 16.2374 8.17678 15.7626 8.46967 15.4697L9.46967 14.4697C9.61032 14.329 9.80109 14.25 10 14.25C10.1989 14.25 10.3897 14.329 10.5303 14.4697L11 14.9393L11.4697 14.4697C11.6103 14.329 11.8011 14.25 12 14.25C12.1989 14.25 12.3897 14.329 12.5303 14.4697L13 14.9393L13.4697 14.4697C13.6103 14.329 13.8011 14.25 14 14.25C14.1989 14.25 14.3897 14.329 14.5303 14.4697L15.5303 15.4697C15.8232 15.7626 15.8232 16.2374 15.5303 16.5303Z" fill="#000000"></path> </g></svg>
        </Link>
        <div
          onClick={() => {
            cartItems.length > 0 && setShowSidebar(!showSidebar);
          }}
        className="relative cursor-pointer hover:-translate-y-1 duration-300">
        <svg
                    className="w-6 h-6 inline-block mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                        stroke="#000"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full px-1">
            {cartItems.length}
          </span>
        </div>
      </div>
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
    </div>
  );
}

export default Navbar;
