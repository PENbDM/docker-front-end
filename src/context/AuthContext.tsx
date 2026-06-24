import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    login as loginRequest,
    logout as logoutRequest,
    register as registerRequest,
    me,
} from "../api/auth";

interface User {
    id: number;
    email: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function login(data: LoginData) {
        const response = await loginRequest(data);
        setUser(response.data.user);
    }

    async function register(data: RegisterData) {
        const response = await registerRequest(data);
        setUser(response.data.user);
    }

    async function checkAuth() {
        try {
            const response = await me();
            setUser(response.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try {
            await logoutRequest();
        } finally {
            setUser(null);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}