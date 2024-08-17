import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const Login = () => {
    const { signIn, googleSignin } = useContext(AuthContext)
    const location = useLocation();
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: 'Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                form.reset()
                navigate(location?.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'try again'
                  })
            })
    }
    const handleGoogleLogin = () => {
        googleSignin()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: 'Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                navigate(location?.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'try again'
                  })
            })
    }
    return (
        <div className=" dark:bg-gray-50 dark:text-gray-800">
            <div className="w-full max-w-3xl mx-auto p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex w-full relative ">
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        className="input w-full input-bordered" required />
                                    <span onClick={() => setShowPass(!showPass)} className="absolute top-4 right-3">
                                        {
                                            showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">LogIn</button>
                            </div>
                           
                        </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleLogin} aria-label="Log in with Google" className="p-3 rounded-sm">
                        <FaGoogle className="text-xl"></FaGoogle>
                    </button>
                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don&apos;t have an account?
                    <Link to={'/signUp'} rel="noopener noreferrer" href="#" className="underline dark:text-gray-800">SignUp</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;