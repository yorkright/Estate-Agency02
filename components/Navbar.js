'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
const [isOpen, setIsOpen] = React.useState(false);

const toggleMenu = () => {
    setIsOpen(!isOpen);
};

return (
    <nav className="bg-slate-950 dark:bg-gray-900 fixed w-full z-10 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
           
        <Link href='/'>
        <h2 className="text-2xl  animate-bounce mt-3 font-serif text-center   text-gray-100">
        BUY-YOR-<span className="text-5xl text-green-500 ">D</span>REAM
        </h2>
        </Link>
       
            {/* <a
                href="https://flowbite.com/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
            > */}
               {/* <Link href='/'>
               <Image
                    src="/Black and White House Real Estate Logo (1).gif"
                    width={120}
                    height={120}
                    property="priority"
                     className="rounded  object-cover repeat-none"
                    alt="Canva-"
                />
               </Link> */}
           
            {/* </a> */}
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                    type="button"
                    className="animate-pulse text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center p-2  w-10 h-10 justify-center text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded={isOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`items-center justify-between ${
                    isOpen ? 'block' : 'hidden'
                } w-full md:flex md:w-auto md:order-1`}
                id="navbar-sticky"
            >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-bold border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <Link
                            href='/Property'
                            className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                            aria-current="page"
                        >
                            Property/Home    
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/agents"
                            className="block py-2 px-3  text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            Agent
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Service"
                            className="block py-2 px-3 text-gray-100 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="Contact"
                            className="block py-2 px-3 text-gray-100 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
};

export default Navbar;
