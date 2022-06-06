import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHamburger } from "@react-icons/all-files/fa/FaHamburger";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white-500 border shadow-sm mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            >
              <a>
                {" "}
                <Image src="/spoti.png" width={36} height={36} />
              </a>
            </Link>

            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaHamburger size={30} className="text-green-400" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col gap-6 mr-7 lg:flex-row list-none lg:ml-auto ">
              <li className="nav-item no-underline">
                <Link href="/">
                  <a className="nav-item no-underline text-black ">HOME</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/topten">
                  <a className="nav-item no-underline text-black">TOPTEN</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/addsong">
                  <a className="nav-item no-underline text-black">SONGᐩ</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/addartist">
                  <a className="nav-item no-underline text-black">ARTISTᐩ</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
