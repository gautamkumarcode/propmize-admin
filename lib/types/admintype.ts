export interface GetAdminDashboardResponse {
	overview: Overview;
	recentActivities: RecentActivity[];
	recentProperties: RecentProperty[];
}

export interface Overview {
	activeUsers: number;
	totalProperties: number;
	totalRevenue: number;
	pendingApprovals: number;
}

export interface RecentActivity {
	type: string;
	description: string;
	date: Date;
}

export interface RecentProperty {
	title: string;
	seller: Seller;
	images: string[];
	price: number;
	createdAt: Date;
	_id: string;
	status: string;
}

export interface Seller {
	_id: string;
	name: string;
}

// property type
export interface GetRecentPropertiesResponse {
	success: boolean;
	count: number;
	pagination: Pagination;
	data: property[];
}

export interface property {
	area: Area;
	address: Address;
	seo: SEO;
	pricing: Pricing;
	contact: Contact;
	features: Features;
	nearbyPlaces: NearbyPlaces;
	_id: string;
	title: string;
	description: string;
	propertyType: string;
	listingType: string;
	price: number;
	currency: string;
	bedrooms: null;
	bathrooms: null;
	balconies: null;
	parking: null;
	furnished: string;
	floor: null;
	totalFloors: null;
	age: number;
	images: string[];
	videos: any[];
	amenities: any[];
	seller: Seller;
	status: string;
	featured: boolean;
	premium: boolean;
	views: number;
	approvalStatus: string;
	notes: string;
	viewedBy: any[];
	likedBy: any[];
	contactedBy: any[];
	expiresAt: Date;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface Address {
	street: string;
	area: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	landmark: string;
}

export interface Area {
	value: number;
	unit: string;
}

export interface Contact {
	name: string;
	phone: string;
	whatsapp: string;
	type: string;
}

export interface Features {
	facing: string;
	flooringType: string;
	waterSupply: string;
	powerBackup: boolean;
	servantRoom: boolean;
	poojaRoom: boolean;
	studyRoom: boolean;
	storeRoom: boolean;
	garden: boolean;
	swimmingPool: boolean;
	gym: boolean;
	lift: boolean;
	security: boolean;
}

export interface NearbyPlaces {
	schools: any[];
	hospitals: any[];
	malls: any[];
	transport: any[];
}

export interface Pricing {
	basePrice: null;
	maintenanceCharges: null;
	securityDeposit: null;
	priceNegotiable: boolean;
}

export interface Seller {
	_id: string;
	phone: string;
	avatar: null;
	email: string;
	name: string;
}

export interface SEO {
	metaTitle: string;
	metaDescription: string;
	slug: string;
}

export interface Pagination {
	page: number;
	limit: number;
	total: number;
	pages: number;
}

export type PropertyResponse = {
	_id: string;
	title: string;
	description: string;
	propertyType: string;
	location: string;
	price: number;
	images: string[];
	approvalStatus: "approved" | "pending" | "rejected";
	createdAt: string;
	updatedAt: string;
	area?: { value: number; unit: string };
	bedrooms?: number;
	bathrooms?: number;
	balconies?: number;
	parking?: number;
	furnished?: string;
	contact?: {
		name: string;
		phone: string;
		whatsapp?: string;
		type: string;
	};
	pricing?: {
		basePrice?: number;
		maintenanceCharges?: number;
		securityDeposit?: number;
		brokeragePercentage?: number;
		priceNegotiable?: boolean;
	};
	legalInfo?: {
		ownershipType?: string;
		rera?: { number: string; url?: string };
	};
	address?: {
		street?: string;
		area?: string;
		city?: string;
		state?: string;
		zipCode?: string;
		country?: string;
		landmark?: string;
		coordinates?: { latitude: number; longitude: number };
	};
	features?: {
		facing?: string;
		flooringType?: string;
		waterSupply?: string;
		powerBackup?: boolean;
	};
	amenities?: string[];
	nearbyPlaces?: {
		schools?: { name: string; distance: number; unit?: string }[];
		hospitals?: { name: string; distance: number; unit?: string }[];
		malls?: { name: string; distance: number; unit?: string }[];
		transport?: { name: string; distance: number; unit?: string }[];
	};
	age?: number;
	floor?: number;
	totalFloors?: number;
	videos?: string[];
	virtualTour?: string;
	status?: string;
	seller?: string;
	notes?: string;
	views?: number;
	expiresAt?: string;
	createdBy?: string;
	updatedBy?: string;
	likedBy?: string[];
	contactedBy?: string[];
	viewedBy?: string[];
	listingType?: string;
	__v?: number;
};

export interface AnalyticsResponse {
	monthlyStats: MonthlyStat[];
	monthlyRevenue: any[];
	propertyTypeStats: PropertyTypeStat[];
	locationStats: LocationStat[];
	keyMetrics: KeyMetrics;
	propertiesMetrics: PropertiesMetrics;
	conversionMetrics: ConversionMetrics;
	recentActivity: RecentActivity[];
}

export interface ConversionMetrics {
	listingToSaleRate: number;
	avgDaysOnMarket: number;
	userEngagementRate: number;
	returnVisitorRate: number;
}

export interface KeyMetrics {
	totalProperties: number;
	prevTotalProperties: number;
	activeUsers: number;
	prevActiveUsers: number;
	totalRevenue: number;
	prevTotalRevenue: number;
	pageViews: number;
	prevPageViews: number;
}

export interface LocationStat {
	_id: string;
	properties: number;
	avgPrice: number;
}

export interface MonthlyStat {
	_id: ID;
	listings: number;
	sales: number;
}

export interface ID {
	month: number;
	year: number;
}

export interface PropertiesMetrics {
	pendingApprovals: number;
	approvedToday: number;
	avgPrice: number;
}

export interface PropertyTypeStat {
	_id: string;
	value: number;
}

export interface RecentActivity {
	type: string;
	description: string;
	time: string;
}

export interface AdminClientResponse {
	address: Address;
	preferences: Preferences;
	_id: string;
	name?: string;
	email?: string;
	role: string;
	avatar: null | string;
	isEmailVerified: boolean;
	isPhoneVerified: boolean;
	isActive: boolean;
	isPremium: boolean;
	premiumExpiresAt: null;
	bio: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	phone?: string;
	propertiesViewed?: string[];
	propertiesLiked?: string[];
	propertiesContacted?: string[];
	propertyValue?: number;
	propertiesCount?: number;
}

export interface UserAddress {
	country: string;
	city?: string;
	state?: string;
	street?: string;
	zipCode?: string;
}

export interface Preferences {
	priceRange: PriceRange;
	notifications: Notifications;
	propertyTypes: any[];
	locations: any[];
}

export interface Notifications {
	email: boolean;
	sms: boolean;
	push: boolean;
}

export interface PriceRange {
	min: number;
	max: number;
}
