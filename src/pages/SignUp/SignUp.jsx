import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const SignUp = () => {
    const { createUser, userInfoUpdate } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [registerError, setRegisterError] = useState('')
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setRegisterError("Password must have at least 6 characters long");
            return
        } else if (!/[a-z]/.test(password)) {
            setRegisterError("Password must have at least  one lowercase letter");
            return
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("Password must have at least one uppercase letter");
            return
        }
        createUser(email, password)
            .then(() => {
                userInfoUpdate(name)
                    .then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: 'Register Successfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        form.reset()
                        navigate(location?.state || '/')

                    })
            })
            .catch(error => {
                setRegisterError(error.message)
                Swal.fire({
                    title: "error!",
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })

    }
    return (
        <div className=" min-h-screen bg-base-200">
            <div className=" flex-col ">
                <div className="text-center py-10">
                    <h1 className="text-5xl font-bold">Register Now!</h1>
                </div>
                <div className="card shrink-0  max-w-3xl mx-auto pb-10 shadow-xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
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
                            <button className="btn btn-primary">Register</button>
                        </div>
                        {registerError && <p className="text-red-600">{registerError}</p>}
                    </form>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-600">Already have an account?
                        <Link to={'/login'} rel="noopener noreferrer" href="#" className="underline dark:text-gray-800">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;