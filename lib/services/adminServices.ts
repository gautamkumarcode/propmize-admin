import apiClient from "../api";
import {
	AdminClientResponse,
	AnalyticsResponse,
	GetAdminDashboardResponse,
	GetRecentPropertiesResponse,
	PropertyResponse,
} from "../types/admintype";
import { ApiResponse } from "../types/api";

export class AdminService {
	static async getAdminDashboard(): Promise<GetAdminDashboardResponse> {
		const response = await apiClient.get<GetAdminDashboardResponse>(
			"/admin/dashboard"
		);

		return response.data;
	}

	static async getRecentProperties(): Promise<GetRecentPropertiesResponse> {
		const response = await apiClient.get<GetRecentPropertiesResponse>(
			"/admin/properties"
		);
		return response.data;
	}
	static async approveProperty(id: string): Promise<ApiResponse<null>> {
		const response = await apiClient.post<ApiResponse<null>>(
			`/admin/property/${id}/approve`
		);
		return response.data;
	}
	static async rejectProperty(id: string): Promise<ApiResponse<null>> {
		const response = await apiClient.post<ApiResponse<null>>(
			`/admin/property/${id}/reject`
		);
		return response.data;
	}
	static async getPropertyById(
		id: string
	): Promise<ApiResponse<PropertyResponse>> {
		const response = await apiClient.get<ApiResponse<PropertyResponse>>(
			`/admin/property/${id}`
		);
		return response.data;
	}
	static async getAnalyticsDashboard(): Promise<AnalyticsResponse> {
		const response = await apiClient.get<AnalyticsResponse>("/admin/analytics");
		return response.data;
	}
	static async getAllAgents(): Promise<ApiResponse<AdminClientResponse[]>> {
		const response = await apiClient.get<ApiResponse<AdminClientResponse[]>>(
			"/admin/agents"
		);
		return response.data;
	}
	static async getAllClients(
		statusFilter?: string,
		typeFilter?: string,
		searchTerm?: string
	): Promise<ApiResponse<AdminClientResponse[]>> {
		// Only include params with values
		const params: Record<string, string> = {};
		if (statusFilter) params.status = statusFilter;
		if (typeFilter) params.type = typeFilter;
		if (searchTerm) params.search = searchTerm;

		const response = await apiClient.get<ApiResponse<AdminClientResponse[]>>(
			"/admin/clients",
			{ params }
		);
		return response.data;
	}
	static async createClient(
		name: string,
		email: string,
		phone: string,
		role: string
	): Promise<ApiResponse<AdminClientResponse>> {
		const response = await apiClient.post<ApiResponse<AdminClientResponse>>(
			"/admin/clients/add",
			{ name, email, phone, role }
		);
		return response.data;
	}
	static async getClientById(
		id: string
	): Promise<ApiResponse<AdminClientResponse>> {
		const response = await apiClient.get<ApiResponse<AdminClientResponse>>(
			`/admin/clients/${id}`
		);
		return response.data;
	}
	static async updateClient(
		id: string,
		name: string,
		email: string,
		phone: string,
		status: string,
		type: string
	): Promise<ApiResponse<AdminClientResponse>> {
		const response = await apiClient.put<ApiResponse<AdminClientResponse>>(
			`/admin/clients/${id}`,
			{ name, email, phone, status, type }
		);
		return response.data;
	}
	static async deleteClient(id: string): Promise<ApiResponse<null>> {
		const response = await apiClient.delete<ApiResponse<null>>(
			`/admin/clients/${id}`
		);
		return response.data;
	}
}
