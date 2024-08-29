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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { SignInUser } from "../../store/auth/authThunk";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
const Login = () => {
    const [show, setshow] = useState(false);
    const handleClick = () => setshow(!show);
    const [loading, setloading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    let history = useHistory();

    const submitFormData = async (e) => {
        e.preventDefault();
        setloading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(SignInUser(userCredential.user));
                setloading(false);
            })
            .catch((error) => {
                setloading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage, "error");
                // toast.error(errorMessage);
            });
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight flex justify-center text-gray-900 md:text-2xl dark:text-white">
                                Sign In
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={submitFormData}
                            >
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
                                        autoComplete="new-email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    // type="submit"
                                    className="w-full  bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    {loading ? "loading" : "Sign in"}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        to="/register"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign up
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

export default Login;
