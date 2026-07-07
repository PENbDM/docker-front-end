import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { db_get_connection_byID } from "../api/datasources";
import {
    query_get_tables,
    query_get_columns,
    query_run,
} from "../api/query";

interface Filter {
    column: string;
    operator: string;
    value: string;
}

function Dashboard() {
    const { id } = useParams();

    const [tables, setTables] = useState<string[]>([]);
    const [selectedTable, setSelectedTable] = useState("");

    const [columns, setColumns] = useState<string[]>([]);
    const [rows, setRows] = useState<any[][]>([]);

    const [filters, setFilters] = useState<Filter[]>([
        {
            column: "",
            operator: "=",
            value: "",
        },
    ]);

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            try {
                const connection = await db_get_connection_byID(Number(id));

                const tablesResponse = await query_get_tables(
                    connection.data.id
                );

                setTables(tablesResponse.data);
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, [id]);

    const handleTableClick = async (table: string) => {
        if (!id) return;

        setSelectedTable(table);

        try {
            const response = await query_get_columns(
                Number(id),
                table
            );

            setColumns(response.data);

            runQuery(table);

        } catch (err) {
            console.error(err);
        }
    };

    const runQuery = async (
        table = selectedTable
    ) => {

        if (!id || !table)
            return;

        try {

            const response = await query_run(
                Number(id),
                {
                    table,
                    filters: filters.filter(
                        (f) =>
                            f.column !== "" &&
                            f.value !== ""
                    ),
                }
            );

            setColumns(response.data.columns);

            setRows(response.data.rows);

        } catch (err) {
            console.error(err);
        }
    };

    const updateFilter = (
        index: number,
        field: keyof Filter,
        value: string
    ) => {

        const copy = [...filters];

        copy[index][field] = value;

        setFilters(copy);

    };

    return (
        <div className="flex h-[calc(100vh-65px)]">

            {/* Sidebar */}

            <aside className="w-64 border-r bg-white">

                <h2 className="p-4 text-lg font-semibold">
                    Tables
                </h2>

                {tables.map((table) => (
                    <button
                        key={table}
                        onClick={() =>
                            handleTableClick(table)
                        }
                        className={`block w-full px-4 py-3 text-left hover:bg-gray-100 ${
                            selectedTable === table
                                ? "bg-gray-100 font-semibold"
                                : ""
                        }`}
                    >
                        {table}
                    </button>
                ))}

            </aside>

            {/* Main */}

            <main className="flex-1 overflow-auto p-8">

                {!selectedTable && (
                    <p>Select a table.</p>
                )}

                {selectedTable && (
                    <>

                        <h1 className="mb-6 text-3xl font-bold">
                            {selectedTable}
                        </h1>

                        {/* Columns */}

                        <div className="mb-6 flex flex-wrap gap-3">

                            {columns.map((column) => (
                                <label
                                    key={column}
                                    className="flex items-center gap-2 rounded border px-4 py-2"
                                >
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />

                                    {column}

                                </label>
                            ))}

                        </div>

                        {/* Filters */}

                        <div className="mb-8">

                            <h2 className="mb-4 text-xl font-semibold">
                                Filters
                            </h2>

                            {filters.map((filter, index) => (

                                <div
                                    key={index}
                                    className="mb-3 flex gap-3"
                                >

                                    <select
                                        value={filter.column}
                                        onChange={(e) =>
                                            updateFilter(
                                                index,
                                                "column",
                                                e.target.value
                                            )
                                        }
                                        className="rounded border px-3 py-2"
                                    >

                                        <option value="">
                                            Column
                                        </option>

                                        {columns.map((column) => (
                                            <option
                                                key={column}
                                                value={column}
                                            >
                                                {column}
                                            </option>
                                        ))}

                                    </select>

                                    <select
                                        value={filter.operator}
                                        onChange={(e) =>
                                            updateFilter(
                                                index,
                                                "operator",
                                                e.target.value
                                            )
                                        }
                                        className="rounded border px-3 py-2"
                                    >

                                        <option value="=">=</option>
                                        <option value="!=">!=</option>
                                        <option value=">">{">"}</option>
                                        <option value="<">{"<"}</option>
                                        <option value=">=">{">="}</option>
                                        <option value="<=">{"<="}</option>
                                        <option value="LIKE">LIKE</option>

                                    </select>

                                    <input
                                        value={filter.value}
                                        onChange={(e) =>
                                            updateFilter(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        className="rounded border px-3 py-2"
                                        placeholder="Value"
                                    />

                                </div>

                            ))}

                            <div className="flex gap-3">

                                <button
                                    onClick={() =>
                                        setFilters([
                                            ...filters,
                                            {
                                                column: "",
                                                operator: "=",
                                                value: "",
                                            },
                                        ])
                                    }
                                    className="rounded border px-4 py-2"
                                >
                                    + Add Filter
                                </button>

                                <button
                                    onClick={() =>
                                        runQuery()
                                    }
                                    className="rounded bg-blue-600 px-4 py-2 text-white"
                                >
                                    Run Query
                                </button>

                            </div>

                        </div>

                        {/* Results */}

                        <div className="overflow-x-auto rounded-lg border">

                            <table className="min-w-full">

                                <thead className="bg-gray-100">

                                <tr>

                                    {columns.map((column) => (

                                        <th
                                            key={column}
                                            className="border-b px-4 py-3 text-left"
                                        >
                                            {column}
                                        </th>

                                    ))}

                                </tr>

                                </thead>

                                <tbody>

                                {rows.map((row, rowIndex) => (

                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-gray-50"
                                    >

                                        {row.map(
                                            (
                                                cell,
                                                cellIndex
                                            ) => (

                                                <td
                                                    key={cellIndex}
                                                    className="border-b px-4 py-3"
                                                >
                                                    {String(cell)}
                                                </td>

                                            )
                                        )}

                                    </tr>

                                ))}

                                </tbody>

                            </table>

                        </div>

                    </>
                )}

            </main>

        </div>
    );
}

export default Dashboard;