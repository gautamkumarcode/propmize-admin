export type NotificationTypes = {
	_id: string;
	userId: string;
	title: string;
	message: string;
	type:
		| "info"
		| "success"
		| "warning"
		| "error"
		| "system"
		| "property"
		| "message";
	actionUrl?: string;
	metadata?: Record<string, any>;
	read: boolean;
	createdAt?: Date;
	updatedAt?: Date;
};
