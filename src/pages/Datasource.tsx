import {
    Hand,
    ShieldCheck,
    Clock3,
    CheckCircle2,
} from "lucide-react";
import {useEffect, useState} from "react";
import {db_connect,db_get_connections} from "../api/datasources.ts";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Datasource() {
    const { user, loading, logout } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        host: "",
        port: "",
        database: "",
        user: "",
        password: "",
    });
    const [showDatabases, setShowDatabases] = useState(false);
    const [showDBcredentials,setShowDBcredentials] = useState(false);
    const [error, setError] = useState("");
    const [success,setSuccess] = useState("")
    const [connections,setConnections] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess('')
        setError('')
        try {
            const response = await db_connect({
                name: formData.name,
                host: formData.host,
                port: Number(formData.port),
                database_name: formData.database,
                username: formData.user,
                encrypted_password: formData.password,
            });

            console.log(response);
            if(response.status === 201) {
                setSuccess('Connected successfully.');
            }

        } catch (error) {

            setError(error.response?.data.error);
            console.error(error.response?.data);
        }
    };
    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const response = await db_get_connections();
                setConnections(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConnections();
    }, []);
    console.log(connections);



    return (

        <div className="min-h-screen bg-[#f6f6f7] py-16">
            <div className="mx-auto max-w-5xl px-6">

                {/* Header */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Hand
                            size={44}
                            strokeWidth={1.8}
                            className="text-[#8CA5D9]"
                        />

                        <h1 className="text-5xl font-bold tracking-tight text-[#444556]">
                            Welcome
                        </h1>
                    </div>

                    <div className="mt-5 text-lg text-[#5d6170]">
                        {connections ? (
                            <p>
                                Datasources for {user.email}
                                <br />
                                <span className="font-bold">
                    ({connections.length})
                        </span>
                            </p>
                        ) : (
                            <p>
                                To get started, connect your database or try a sample database.
                            </p>
                        )}
                    </div>
                </div>

                {/*All contections of user */}
                <div className="mt-10 mb-10 mx-auto w-[768px] space-y-4">
                    {connections.map((connection) => (
                        <div
                            key={connection.id}
                            onClick={() => navigate(`/dashboard/${connection.id}`)}
                            className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4">
                                <p className="text-base font-semibold text-gray-900">
                                    {connection.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Postgres
                                </p>
                            </div>

                            <button
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Launch
                            </button>
                        </div>
                    ))}
                </div>



                {/* Main Card */}
                {connections ? <div className="flex justify-center">
                    <button
                        onClick={()=>setShowDatabases(prev=>!prev)}
                        className="flex items-center gap-3 rounded-full bg-yellow-400 px-4 py-5 text-3xl font-medium text-blue-500 cursor-pointer transition hover:bg-yellow-500"
                    >
                        <span className="text-4xl font-light leading-none">+</span>
                        <span>Connect a database</span>
                    </button>
                </div> : (
                    <div className="mt-12 rounded-3xl border border-gray-200 bg-white px-10 py-10 shadow-sm">

                        {/* Title */}
                        <h2 className="text-center text-3xl font-semibold text-[#444556]">
                            Connect a database
                        </h2>

                        {/* Features */}
                        <div className="mt-10 grid grid-cols-2 gap-10">

                            <div className="flex items-center gap-4">
                                <ShieldCheck
                                    size={42}
                                    className="text-cyan-500"
                                />

                                <div className="text-base text-gray-600 leading-7">
                                    <p>• Secure connection</p>
                                    <p>• Read-only transaction</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Clock3
                                    size={42}
                                    className="text-orange-400"
                                />

                                <div className="text-base text-gray-600 leading-7">
                                    <p>• 2 minute set-up</p>
                                    <p>• Chat support</p>
                                </div>
                            </div>

                        </div>

                        {/* Description */}
                        <p className="mt-8 text-base leading-7 text-gray-600">
                            Data security is our first priority, which is why we're trusted by
                            many of the world's most successful organizations.
                        </p>

                        <hr className="my-8 border-gray-200" />

                        {/* Step */}
                        <h3 className="text-center text-2xl font-semibold text-[#444556]">
                            Step 1: Your database credentials
                        </h3>

                        {/* Buttons */}
                        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-5">

                            <button
                                onClick={() => setShowDatabases(!showDatabases)}
                                className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-green-500
                bg-green-50
                px-6
                py-4
                transition
                hover:bg-green-100
              "
                            >
              <span className="text-base font-medium">
                I know my database credentials
              </span>

                                <CheckCircle2
                                    size={22}
                                    className="text-green-600"
                                />
                            </button>

                            <button
                                className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-[#c6d2ea]
                px-6
                py-4
                transition
                hover:bg-blue-50
              "
                            >
              <span className="text-base font-medium">
                Someone needs to help me
              </span>

                                <CheckCircle2
                                    size={22}
                                    className="text-gray-300"
                                />
                            </button>

                        </div>

                    </div>
                )}


            {showDatabases && (
                <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
                    <div className="relative flex items-center justify-end">
                        <h3 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold text-[#444556]">
                            Step 2: Your database type
                        </h3>

                        <button
                            onClick={() => setShowDatabases((prev)=>!prev)}
                            className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white text-4xl font-light text-slate-500 transition hover:bg-gray-100 hover:text-slate-700 cursor-pointer">
                            ×
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-4 gap-5">

                        <button onClick={()=>setShowDBcredentials(prev=>!prev)} className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            🐘
                            <span>Postgres</span>
                        </button>
                        <button
                            className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            🐬
                            <span>MySQL</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            ❄️
                            <span>Snowflake</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            🔵
                            <span>BigQuery</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            📊
                            <span>Redshift</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            🟣
                            <span>Panoply</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            🗄️
                            <span>SQL Server</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            🦭
                            <span>MariaDB</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            ☁️
                            <span>Azure SQL</span>
                        </button>

                        <button className="rounded-xl border border-[#c6d2ea] px-5 py-4 text-left hover:bg-blue-50">
                            More database options
                        </button>

                    </div>

                    <div className="mt-10 flex justify-center">
                        <button className="rounded-full border px-8 py-3 text-[#4b679c] hover:bg-gray-50">
                            💬 Live chat support
                        </button>
                    </div>

                </div>
            )}
                {
                    showDBcredentials && showDatabases ? <div className='mt-12 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm'>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    required={true}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Host</label>
                                <input
                                    required={true}
                                    type="text"
                                    name="host"
                                    value={formData.host}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Port</label>
                                <input
                                    required={true}
                                    type="text"
                                    name="port"
                                    value={formData.port}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Database</label>
                                <input
                                    required={true}
                                    type="text"
                                    name="database"
                                    value={formData.database}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">User</label>
                                <input
                                    required={true}
                                    type="text"
                                    name="user"
                                    value={formData.user}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <input
                                    required={true}
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                                Test connection
                            </button>
                            <div className='text-red-500'>{error ? error : null}</div>
                            <div className='text-green-600'>{success ? success :null}</div>
                        </form>
                    </div>:null
                }
            </div>
        </div>
    );
}