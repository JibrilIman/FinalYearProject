/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RegisterUser } from "../../store/auth/authThunk";
const Register = () => {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const history = useHistory();
    console.log("loading", loading);

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight flex justify-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign Up
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    dispatch(
                                        RegisterUser(
                                            registerName,
                                            registerEmail,
                                            registerPassword,
                                            setloading
                                        )
                                    );
                                }}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        placeholder="Name"
                                        type="text"
                                        value={registerName}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        autoComplete="new-email"
                                        onChange={(e) =>
                                            setRegisterName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Email"
                                        type="email"
                                        value={registerEmail}
                                        autoComplete="new-email"
                                        onChange={(e) =>
                                            setRegisterEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={registerPassword}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setRegisterPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    // type="submit"
                                    className="w-full  bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    {loading === true
                                        ? "loading"
                                        : "Create account"}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
