import api from './axios'


export const query_get_tables = (id:number)=>{
    return api.get(`/api/query/${id}/tables/`);
}
export const query_get_columns = (
    id: number,
    table: string
) => {
    return api.get(
        `/api/query/${id}/tables/${table}/columns/`
    );
};


export const query_get_rows = (
    id: number,
    table: string
) => {
    return api.get(
        `/api/query/${id}/tables/${table}/rows/`
    );
};

export const query_run = (
    id: number,
    data: any
) => {
    return api.post(
        `/api/query/${id}/query/`,
        data
    );
};