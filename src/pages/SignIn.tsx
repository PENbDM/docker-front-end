import { Link } from "react-router";
import logo from "../assets/icons/logo.svg";
import {useState} from 'react'
import { useAuth} from '../context/AuthContext.tsx'
import {useNavigate} from "react-router";
function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login}= useAuth();
    console.log(email, password);

    const handleLogin = async (e:any) => {
        e.preventDefault();

        const response = await login({
            email,
            password,
        })
        console.log(response)
        navigate('/datasource')
    }
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img
                        src={logo}
                        alt="Trevor IO"
                        className="h-8"
                    />
                </div>

                <h1 className="text-4xl font-bold text-center text-gray-800">
                    Log in
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-10">
                    Welcome back to Trevor.io
                </p>

                <form className="space-y-5">

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-4
                            outline-none
                            focus:border-black
                        "
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-4
                            outline-none
                            focus:border-black
                        "
                    />

                    <button
                        onClick={handleLogin}
                        className="
                            w-full
                            py-4
                            rounded-xl
                            bg-black
                            text-white
                            font-semibold
                            hover:bg-gray-900
                            transition
                        "
                    >
                        Log in
                    </button>

                </form>

                <div className="text-center mt-6">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <div className="text-center mt-8 text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/login/sign-up"
                        className="font-semibold text-black hover:underline"
                    >
                        Sign up
                    </Link>
                </div>

                <p className="text-center text-xs text-gray-400 mt-12">
                    © 2026 Trevor.io
                </p>

            </div>
        </div>
    );
}

export default SignIn;