import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { AuthService } from "../lib/services/authService";

export interface User {
	_id: string;
	name: string;
	email: string;
	phone: string;
	role: string;
	avatar?: string;
	createdAt: string;
	updatedAt: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (user: User, accessToken: string, refreshToken: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = AuthService.getAccessToken();
		if (token) {
			AuthService.getProfile().then((res) => {
				if (res.success) {
					setUser(res.data);
					setIsAuthenticated(true);
				}
			});
		}
	}, []);

	const login = (user: User, accessToken: string, refreshToken: string) => {
		setUser(user);
		setIsAuthenticated(true);
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);
	};

	const logout = () => {
		setUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
