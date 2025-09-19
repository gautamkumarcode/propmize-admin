import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, QueryKeys } from "../react-query/queryClient";
import { AdminService } from "../services/adminServices";
import {
	GetAdminDashboardResponse,
	GetRecentPropertiesResponse,
	property,
} from "../types/admintype";
import { ApiResponse } from "../types/api";

export const useAdminDashboard = () => {
	return useQuery({
		queryKey: [QueryKeys.adminDashboard],
		queryFn: () => AdminService.getAdminDashboard(),
		select: (data: GetAdminDashboardResponse) => data,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const getAllProperties = () => {
	return useQuery<GetRecentPropertiesResponse, unknown, property[]>({
		queryKey: [QueryKeys.properties],
		queryFn: () => AdminService.getRecentProperties(),
		select: (data) => data.data,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useApproveProperty = () => {
	return useMutation<ApiResponse<null>, Error, string, unknown>({
		mutationFn: (id: string) => AdminService.approveProperty(id),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: [QueryKeys.properties] });

			getAllProperties().refetch();
		},
	});
};
export const useRejectProperty = () => {
	return useMutation<ApiResponse<null>, Error, string, unknown>({
		mutationFn: (id: string) => AdminService.rejectProperty(id),
		// onMutate: (id) => {

		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: [QueryKeys.properties] });
			getAllProperties().refetch();
		},
	});
};

export const useGetPropertyById = (id: string) => {
	return useQuery({
		queryKey: [QueryKeys.property(id)],
		queryFn: () => AdminService.getPropertyById(id),
		select: (data) => data,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useGetAnalyticsDashboard = () => {
	return useQuery({
		queryKey: [QueryKeys.adminAnalytics],
		queryFn: () => AdminService.getAnalyticsDashboard(),
		select: (data) => data,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useGetAllAgents = () => {
	return useQuery({
		queryKey: [QueryKeys.adminAgents],
		queryFn: () => AdminService.getAllAgents(),
		select: (data) => data.data,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};
export const useGetAllClients = (
	statusFilter?: string,
	typeFilter?: string,
	searchTerm?: string
) => {
	return useQuery({
		queryKey: [
			QueryKeys.adminClients,
			{ statusFilter, typeFilter, searchTerm },
		],
		queryFn: () =>
			AdminService.getAllClients(statusFilter, typeFilter, searchTerm),
		select: (data) => data.data,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useCreateClient = () => {
	return useMutation({
		mutationKey: [QueryKeys.adminClients],
		mutationFn: (clientData: {
			name: string;
			email: string;
			phone: string;
			role: string;
		}) =>
			AdminService.createClient(
				clientData.name,
				clientData.email,
				clientData.phone,
				clientData.role
			),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: [QueryKeys.adminClients] });
		},
	});
};

