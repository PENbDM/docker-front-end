import logo from "../assets/icons/logo.svg";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, loading, logout } = useAuth();
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-[1700px] mx-auto h-20 px-8 flex items-center justify-between">

                {/* Logo */}
                <Link to="/">
                    <img
                        src={logo}
                        alt="Trevor IO"
                        className="h-5 w-auto"
                    />
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-600">
                    <Link to="/datasource">
                        datasource
                    </Link>

                    {/*<a href="#" className="hover:text-black transition-colors">*/}
                    {/*    Pricing*/}
                    {/*</a>*/}

                    {/*<a href="#" className="hover:text-black transition-colors">*/}
                    {/*    Documentation*/}
                    {/*</a>*/}

                    {/*<a href="#" className="hover:text-black transition-colors">*/}
                    {/*    Contact*/}
                    {/*</a>*/}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {loading && (
                        <span className="text-gray-500">
                            Loading...
                        </span>
                    )}

                    {!loading && user && (
                        <>
                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                                    {user.email.charAt(0).toUpperCase()}
                                </div>

                                <span className="text-sm font-medium text-gray-700">
                                    {user.email}
                                </span>

                            </div>

                            <button
                                onClick={logout}
                                className="
                                    px-5
                                    py-2
                                    rounded-lg
                                    border
                                    border-gray-300
                                    text-gray-700
                                    font-medium
                                    hover:bg-gray-100
                                    transition
                                "
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {!loading && !user && (
                        <>
                            <Link to="/login/sign-in">
                                <button
                                    className="
                                        px-6
                                        py-2.5
                                        rounded-lg
                                        bg-black
                                        text-white
                                        font-semibold
                                        hover:bg-gray-900
                                        transition
                                    "
                                >
                                    Login
                                </button>
                            </Link>

                            <Link to="/login/sign-up">
                                <button
                                    className="
                                        px-6
                                        py-2.5
                                        rounded-lg
                                        border
                                        border-gray-300
                                        font-semibold
                                        hover:bg-gray-100
                                        transition
                                    "
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </header>
    );
}

export default Header;