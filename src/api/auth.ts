import api from './axios'

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;

}

export const login =(data:LoginRequest)=>{
    return api.post('api/users/login/', data)
}

export const register =(data:RegisterRequest)=>{
    return api.post('api/users/register/', data)
}

export const me = () =>
    api.get("api/users/me/");

export const logout = () =>
    api.post("api/users/logout/");