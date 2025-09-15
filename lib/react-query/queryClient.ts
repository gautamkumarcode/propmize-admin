import { QueryClient } from "@tanstack/react-query";

interface HttpError {
	response?: {
		status: number;
		data?: {
			message?: string;
			error?: string;
		};
	};
	message?: string;
}

function isHttpError(error: unknown): error is HttpError {
	return (
		typeof error === "object" &&
		error !== null &&
		"response" in error &&
		typeof (error as HttpError).response?.status === "number"
	);
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			retry: (failureCount: number, error: unknown) => {
				if (isHttpError(error) && error.response?.status === 429) return false;
				if (
					isHttpError(error) &&
					error.response?.status &&
					error.response.status >= 400 &&
					error.response.status < 500
				)
					return false;
				return failureCount < 1;
			},
			retryDelay: (attemptIndex: number) =>
				Math.min(3000 * 2 ** attemptIndex, 30000),
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
		mutations: {
			retry: (error: unknown) => {
				if (isHttpError(error) && error.response?.status === 429) return false;
				return false;
			},
		},
	},
});

// Query keys for consistent cache management
export const QueryKeys = {
	// Auth
	auth: ["auth"] as const,
	profile: ["auth", "profile"] as const,
	// Properties
	properties: ["properties"] as const,
	property: (id: string) => ["properties", id] as const,
	myProperties: ["properties", "my-properties"] as const,
	featuredProperties: ["properties", "featured"] as const,
	premiumProperties: ["properties", "premium"] as const,
	likedProperties: ["properties", "liked"] as const,
	recentlyViewedProperties: ["properties", "recently-viewed"] as const,
	propertiesByLocation: (city: string, state?: string) =>
		state
			? ["properties", "location", city, state]
			: ["properties", "location", city],
	searchProperties: (
		query: string,
		filters?: Record<string, unknown> | null
	) => ["properties", "search", query, filters],
	propertyAnalytics: (id: string, period?: string) =>
		period
			? ["properties", id, "analytics", period]
			: ["properties", id, "analytics"],
	// Users
	users: ["users"] as const,
	userProfile: ["users", "profile"] as const,
	userStats: ["users", "stats"] as const,
	userActivity: ["users", "activity"] as const,
	// Leads
	leads: ["leads"] as const,
	myLeads: ["leads", "my-leads"] as const,
	myInquiries: ["leads", "my-inquiries"] as const,
	lead: (id: string) => ["leads", id] as const,
	propertyLeads: (propertyId: string) =>
		["leads", "property", propertyId] as const,
	leadAnalytics: ["leads", "analytics"] as const,
	// Chat
	chat: ["chat"] as const,
	conversations: ["chat", "conversations"] as const,
	conversation: (id: string) => ["chat", "conversations", id] as const,
	messages: (conversationId: string) =>
		["chat", "messages", conversationId] as const,
	unreadCount: ["chat", "unread-count"] as const,
	// AI Chat
	aiChats: ["ai-chats"] as const,
	aiChat: (id: string) => ["ai-chat", id] as const,
	aiChatAnalytics: (id: string) => ["ai-chat-analytics", id] as const,
	aiPropertySearch: ["ai-property-search"] as const,
	// Payments
	payments: ["payments"] as const,
	plans: ["payments", "plans"] as const,
	plan: (id: string) => ["payments", "plans", id] as const,
	paymentHistory: ["payments", "history"] as const,
	payment: (id: string) => ["payments", id] as const,
	subscriptionStatus: ["payments", "subscription-status"] as const,
	// Analytics
	analytics: ["analytics"] as const,
	dashboardAnalytics: ["analytics", "dashboard"] as const,
	analyticsProperty: (id: string) => ["analytics", "properties", id] as const,
	analyticsLeads: ["analytics", "leads"] as const,
	// Notifications
	notifications: ["notifications"] as const,
	notification: (id: string) => ["notifications", id] as const,
	notificationUnreadCount: ["notifications", "unread-count"] as const,
	notificationPreferences: ["notifications", "preferences"] as const,
	// Support
	support: ["support"] as const,
	supportTickets: ["support", "tickets"] as const,
	supportTicket: (id: string) => ["support", "tickets", id] as const,
	faqs: ["support", "faqs"] as const,
	faqCategories: ["support", "faqs", "categories"] as const,
	supportStats: ["support", "stats"] as const,
	sellerPropertyAnalytics: ["analytics", "seller-properties"] as const,
	newlyAddedProperties: ["properties", "newly-added"] as const,
	// Admin
	adminDashboard: ["admin", "dashboard"] as const,
	adminAnalytics: ["admin", "analytics"] as const,
	adminUsers: ["admin", "users"] as const,
	adminAgents: ["admin", "agents"] as const,
	adminClients: ["admin", "clients"] as const,
} as const;
