import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router";

const RegisterPage = () => {
    return (
        <main className="flex flex-col min-h-screen items-center justify-between gap-16">
            <section className="bg-green-500 py-4 flex items-center justify-center w-full">
                <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" />
            </section>
            <section className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-gray-500 align-center">
                    Create Your Account
                </h1>
                <span className="text-xs text-gray-400">Join CodeTribe Academy to empower learners efficiently</span>
            </section>

            <div className="flex flex-col justify-center items-center gap-4">
                <button
                    type="submit"
                    className="bg-green-500 text-white font-semibold p-2 rounded-md hover:bg-green-600 transition-colors"
                    aria-label="Sign in with Google"
                    title="Sign in with Google"
                >
                    <FontAwesomeIcon icon={faGoogle} style={{ color: "#ffff" }} />
                    <span className="sr-only">Sign in with Google</span>
                </button>

                <section className="flex justify-center text-sm text-gray-600">
                    <div className="bg-green-500 w-full h-0.5" />
                    <span>OR</span>
                    <div className="bg-green-500 w-full h-0.5" />
                </section>
                <form className="flex flex-col gap-4 w-80 border border-gray-300 rounded-lg p-6">
                    <label htmlFor="fullname" className="text-gray-800 font-medium">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        placeholder="kgaphola karabo"
                        className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="email" className="text-gray-800 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="kgapholakarabo01@gmail.com"
                        className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="phone-number" className="text-gray-800 font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone-number"
                        placeholder="+27 123 456 789"
                        className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="password" className="text-gray-800 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Minimum 8 charecters"
                        className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="confirm-password" className="text-gray-800 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Re-enter your password"
                        className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="role" className="text-gray-800 font-medium">
                        Role
                    </label>
                    <select name="role" id="role" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="facilitator" >Facilitator</option>
                        <option value="admin" >Admin</option>
                    </select>
                    <div>
                        <FormControlLabel
                            control={<Checkbox color="success" />}
                            label={`I agree to the`}
                            className="p-0 m-0"
                        />
                        <Link to='/terms&conditions' className="text-green-500  p-0">T's & C's</Link>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                        <FontAwesomeIcon icon={faUserPlus} style={{ color: "#ffff" }} />
                        <span className="ml-2">Sign Up</span>
                    </button>
                </form>


                <span className="text-gray-600">
                    Already have an account?{" "}
                    <Link to='/login' className="text-green-500  p-0">Sign in</Link>
                </span>
            </div>

            <footer className="bg-gray-100 pt-4 w-full text-center text-gray-400 border-t border-green-500">
                &copy; 2024 CodeTribe learner Support. All rights reserved.
            </footer>
        </main>
    );
};

export default RegisterPage;
