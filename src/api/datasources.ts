import api from './axios'

export interface DbSource {
    name: string;
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}


export const db_connect =(data:DbSource)=>{
    return api.post('api/db-connection/connect/', data)
}

export const db_get_connections = ()=>{
    return api.get('api/db-connection/get')
}

export const db_get_connection_byID = (id:number)=>{
    return api.get(`/api/db-connection/connect/${id}`);
}
