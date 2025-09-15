export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
	meta?: {
		page?: number;
		limit?: number;
		total?: number;
		totalPages?: number;
	};
}

export interface ApiError {
	message: string;
	errors?: Record<string, string[]>;
	stack?: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	name: string;
	email: string;
	phone: string;
	password: string;
	role: "buyer" | "seller";
}

export interface AuthResponse {
	user: {
		_id: string;
		name: string;
		email: string;
		phone: string;
		role: string;
		avatar?: string;
	};
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
}

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
