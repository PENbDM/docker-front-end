import { Link } from "react-router";
import logo from "../assets/icons/logo.svg";
import {useState} from 'react'
import {useNavigate} from "react-router";
import {useAuth} from "../context/AuthContext.tsx";

function SignUp() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const {register} = useAuth();
    const handleRegister = async (e:any) => {

        e.preventDefault();
        if(password !== confirmPassword){
            return alert("Passwords don't match");
        }const response = await register({
            first_name,
            last_name,
            email,
            password,
        })
        console.log(response)
        navigate("/datasource");
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
                    Sign up
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-10">
                    Create your Trevor.io account
                </p>

                <form className="space-y-5">

                    <input
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        placeholder="First name"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 outline-none focus:border-black"
                    />

                    <input
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder="Last name"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 outline-none focus:border-black"
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 outline-none focus:border-black"
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 outline-none focus:border-black"
                    />

                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm password"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 outline-none focus:border-black"
                    />

                    <button
                        onClick={handleRegister}
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
                        Create account
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-8 leading-6">
                    By creating an account you agree to our{" "}
                    <Link to="/terms" className="text-black hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-black hover:underline">
                        Privacy Policy
                    </Link>.
                </p>

                <div className="text-center mt-8 text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login/sign-in"
                        className="font-semibold text-black hover:underline"
                    >
                        Log in
                    </Link>
                </div>

                <p className="text-center text-xs text-gray-400 mt-12">
                    © 2026 Trevor.io
                </p>

            </div>
        </div>
    );
}

export default SignUp;