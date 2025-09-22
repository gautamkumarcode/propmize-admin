"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/useNotification";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import AuthModal from "../custom/auth-modal/AuthModal";
import NotificationDropdown from "../custom/notificationdropdown/NotificationDropdown";
import { ThemeToggle } from "../theme-toggle";
import Profile01 from "./profile-01";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

export default function TopNav() {
	const { isAuthenticated, user, logout } = useAuthContext();
	const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
	const [showNotifications, setShowNotifications] = useState<boolean>(false);
	const {
		notifications,
		unreadCount,
		markAsRead,
		markAllAsRead,
		deleteNotification,
		handleNotificationClick,
	} = useNotifications();

	return (
		<nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
			<div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]"></div>

			<div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
				<div className="relative">
					<button
						type="button"
						onClick={() => setShowNotifications(!showNotifications)}
						className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors relative">
						<Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
						{unreadCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
								{unreadCount > 9 ? "9+" : unreadCount}
							</span>
						)}
					</button>

					{showNotifications && (
						<NotificationDropdown
							isOpen={showNotifications}
							onClose={() => setShowNotifications(false)}
							notifications={notifications}
							onMarkAsRead={markAsRead}
							onMarkAllAsRead={markAllAsRead}
							onDeleteNotification={deleteNotification}
							onNotificationClick={(notification) => {
								handleNotificationClick(notification);
								setShowNotifications(false);
							}}
						/>
					)}

					{/* Click outside to close */}
					{showNotifications && (
						<div
							className="fixed inset-0 z-40"
							onClick={() => setShowNotifications(false)}
						/>
					)}
				</div>

				<ThemeToggle />

				{isAuthenticated ? (
					<DropdownMenu>
						<DropdownMenuTrigger className="focus:outline-none">
							<Image
								src={
									user?.avatar ||
									"https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
								}
								alt="User avatar"
								width={28}
								height={28}
								className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							sideOffset={8}
							className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg">
							<Profile01 user={user!} />
							<button
								className="mt-2 w-full py-2 px-4 bg-red-500 text-white rounded"
								onClick={logout}>
								Logout
							</button>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<button
						className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
						onClick={() => setShowAuthModal(true)}>
						Login
					</button>
				)}
				{showAuthModal && (
					<AuthModal
						isOpen={showAuthModal}
						onClose={() => setShowAuthModal(false)}
					/>
				)}
			</div>
		</nav>
	);
}