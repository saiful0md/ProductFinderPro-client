
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])
    const navLinks = <>
        <li><NavLink className={({ isActive, isPending }) =>
            [
                isPending
                    ? "pending"
                    : isActive
                        ? "text-red-700 border-b-4 border-red-700 hover:text-red-700 hover:bg-transparent bg-transparent rounded-none"
                        : "hover:text-red-700 "
            ]
        } to={'/'}>Home</NavLink></li>
        <li><NavLink className={({ isActive, isPending }) =>
            [
                isPending
                    ? "pending"
                    : isActive
                        ? "text-red-700 border-b-4 border-red-700 hover:text-red-700 hover:bg-transparent bg-transparent rounded-none"
                        : "hover:text-red-700 "
            ]
        } to={'/allProducts'}>All Products</NavLink></li>
        
    </>
    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(error => {
                if (error) {
                    Swal.fire({
                        title: "error!",
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }

    return (
        <div className="navbar bg-base-100 border border-red-700 mt-2 container max-w-6xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn bg-transparent border-none shadow-none hover:bg-transparent lg:text-xl">Product <span className='text-red-600'>Finder</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="" src={user?.photoURL || 'https://i.ibb.co/YcsgQSK/social-avatar-stories-gradient-frame-41737-3.jpg'} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                        <div>
                            {
                                user ?
                                    <>
                                        <li>
                                            <a className="justify-between">
                                                {user?.displayName}
                                            </a>
                                        </li>
                                        <li>
                                            <a className="justify-between">
                                                {user?.email}
                                            </a>
                                        </li>
                                        <li><a onClick={handleLogOut}>Logout</a></li>
                                    </>
                                    :
                                    <>
                                        <li><Link to={'/register'}>Register</Link></li>
                                        <li><Link to={'/login'}>Login</Link></li>
                                    </>
                            }
                        </div>

                    </ul>
                </div>
                <label className="cursor-pointer ml-4 grid place-items-center">
                    <input
                        onChange={handleToggle}
                        type="checkbox"
                        value="synthwave"
                        className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;