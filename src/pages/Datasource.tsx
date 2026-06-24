import {
    Hand,
    ShieldCheck,
    Clock3,
    CheckCircle2,
} from "lucide-react";
import {useState} from "react";
export default function Datasource() {
    const [showDatabases, setShowDatabases] = useState(false);
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

                    <p className="mt-5 text-lg text-[#5d6170]">
                        To get started, connect your database or try a sample database.
                    </p>
                </div>

                {/* Main Card */}
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

            {showDatabases && (
                <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">

                    <h3 className="text-center text-2xl font-semibold text-[#444556]">
                        Step 2: Your database type
                    </h3>

                    <div className="mt-8 grid grid-cols-4 gap-5">

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
                            🐘
                            <span>Postgres</span>
                        </button>

                        <button className="flex items-center gap-3 rounded-xl border border-[#c6d2ea] px-5 py-4 hover:bg-blue-50">
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
            </div>
        </div>
    );
}