import React, { useState } from "react";
import { BiSolidInjection } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { SignOutUser } from "../store/auth/authThunk";
const Navbar = () => {
    let dispatch = useDispatch();
    const [menu, setMenu] = useState(false);

    const closeMenu = () => {
        setMenu(false);
    };
    const handlelogout = (e) => {
        e.preventDefault();
        dispatch(SignOutUser());
    };
    return (
        <nav className="bg-blue-600 container-fluid ">
            <div className="grid grid-cols-12 text-white md:gap-4 md:py-0 py-2">
                <div className="col-span-12 md:col-span-3 my-auto">
                    <div className="flex md:justify-start justify-between items-center ">
                        <a href="/" className="flex items-center">
                            <GiChiliPepper className="text-3xl" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                                Nutri Health
                            </span>
                        </a>
                        <div
                            className="md:hidden cursor-pointer"
                            onClick={() => setMenu(!menu)}
                        >
                            <IoMenu className="text-3xl" />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-9">
                    <div
                        className="hidden md:block md:w-auto"
                        id="navbar-dropdown"
                    >
                        <ul className="grid grid-cols-4 font-medium p-3">
                            <li>
                                <Link
                                    to="/foodlog"
                                    className="block"
                                    onClick={closeMenu}
                                >
                                    <span className="flex justify-end items-center ">
                                        <PiForkKnifeFill className="mr-1" />
                                        Food Log
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/foodlist"
                                    className="block"
                                    aria-current="page"
                                    onClick={closeMenu}
                                >
                                    <div className="flex justify-end items-center ">
                                        <TfiMenuAlt className="mr-1" />
                                        <span> Food List</span>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/diabetes"
                                    className="block  "
                                    onClick={closeMenu}
                                >
                                    <div className="flex justify-end items-center  ">
                                        <BiSolidInjection className="mr-1" />
                                        <span>Diabetes</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className="block" onClick={handlelogout}>
                                    <div className="flex justify-end items-center  ">
                                        <span>Logout</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {menu && (
                <ul className="absolute top-12 right-5 bg-slate-50 border shadow-lg flex-col font-medium p-4 md:p-0 gap-5 md:flex-row md:mt-0 md:border-0 ">
                    <li>
                        <Link to="/foodlist" onClick={closeMenu}>
                            <div className="flex  p-3">
                                <TfiMenuAlt />
                                <span> Food List</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/foodlog" onClick={closeMenu}>
                            <div className="flex  p-3">
                                <PiForkKnifeFill />
                                <span>Food Log</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="diabetes/" onClick={closeMenu}>
                            <div className="flex  p-3">
                                <BiSolidInjection />
                                <span>Diabetes</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
