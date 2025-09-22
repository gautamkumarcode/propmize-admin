"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

import apiClient from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialTab?: "login" | "register";
	redirectTo?: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface RegisterData {
	name: string;
	email: string;
	phone: string;
	password: string;
}

interface OtpStep {
	phone: string;
	otp: string;
	isOtpSent: boolean;
	role: string;
	recievedOtp: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
	isOpen,
	onClose,
	redirectTo,
}) => {
	const queryClient = useQueryClient();
	const { login } = useAuthContext();
	const router = useRouter();
	const [step, setStep] = useState<OtpStep>({
		phone: "",
		otp: "",
		isOtpSent: false,
		role: "",
		recievedOtp: "",
	});
	const [isNewUser, setIsNewUser] = useState(false);
	const [loading, setLoading] = useState(false);

	// const handlePostAuthRedirect = () => {
	// 	if (redirectTo) {
	// 		if (redirectTo.startsWith("/seller")) {
	// 			setUserMode("seller");
	// 		} else if (redirectTo.startsWith("/buyer")) {
	// 			setUserMode("buyer");
	// 		}
	// 		setTimeout(() => {
	// 			router.push(redirectTo);
	// 		}, 100);
	// 	}
	// 	onClose();
	// };

	const _loginMutation = useMutation({
		mutationFn: async (data: LoginData) => {
			const response = await apiClient.post("/auth/login", data);
			return response.data;
		},
		onSuccess: (data) => {
			const { user, tokens } = data.data;
			login(user, tokens.accessToken, tokens.refreshToken);
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast({
				title: "Login successful",
				description: `Welcome back, ${user.name}!`,
			});
			// handlePostAuthRedirect();
		},
		onError: (error: AxiosError) => {
			const errorMessage =
				(error.response?.data as { error?: string })?.error ||
				typeof error.response?.data === "string"
					? (error.response?.data as string)
					: "Invalid email or password";
			toast({
				title: "Login failed",
				description: errorMessage,
				variant: "destructive",
			});
		},
	});

	const _registerMutation = useMutation({
		mutationFn: async (data: RegisterData) => {
			const response = await apiClient.post("/auth/register", data);
			return response.data;
		},
		onSuccess: (data) => {
			const { user, tokens } = data.data;
			login(user, tokens.accessToken, tokens.refreshToken);
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast({
				title: "Registration successful",
				description: `Welcome to Propmize, ${user.name}!`,
			});
			// handlePostAuthRedirect();
		},
		onError: (error: AxiosError) => {
			toast({
				title: "Registration failed",
				description:
					typeof error.response?.data === "object" &&
					error.response?.data !== null &&
					"error" in error.response.data
						? (error.response.data as { error: string }).error
						: "Registration failed",
				variant: "destructive",
			});
		},
	});

	const handleSendOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!step.phone) {
			toast({
				title: "Validation Error",
				description: "Enter phone number",
				variant: "destructive",
			});
			return;
		}
		const phoneRegex = /^[6-9]\d{9}$/;
		if (!phoneRegex.test(step.phone)) {
			toast({
				title: "Validation Error",
				description: "Enter a valid phone number",
				variant: "destructive",
			});
			return;
		}
		setLoading(true);
		try {
			const res = await apiClient.post("/auth/send-otp", {
				phone: step.phone,
			});
			setIsNewUser(res.data.data.isNewUser);
			setStep((prev) => ({
				...prev,
				isOtpSent: true,
				recievedOtp: res.data.data.otp,
			}));
			toast({
				title: "OTP sent",
				description: "Check your SMS for the OTP.",
			});

			if (res.data.success !== true) {
				toast({
					title: "Error",
					description: "Failed to send OTP",
					variant: "destructive",
				});
			}
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			const errorData = axiosError.response?.data;
			const errorMessage =
				typeof errorData === "object" &&
				errorData !== null &&
				"error" in errorData
					? (errorData as { error: string }).error
					: "Failed to send OTP";
			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!step.otp) {
			toast({
				title: "Validation Error",
				description: "Enter OTP",
				variant: "destructive",
			});
			return;
		}
		setLoading(true);
		const payload = {
			phone: step.phone,
			otp: step.otp,
			...(isNewUser && { role: step.role }),
		};

		try {
			const response = await apiClient.post("/auth/verify-otp", payload);

			const { user, tokens } = response.data.data;
			login(user, tokens.accessToken, tokens.refreshToken);
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast({
				title: "Login successful",
				description: `Welcome, ${user.name || user.phone}!`,
			});
			// if (redirectTo) {
			// 	if (redirectTo.startsWith("/seller")) setUserMode("seller");
			// 	else if (redirectTo.startsWith("/buyer")) setUserMode("buyer");
			// 	setTimeout(() => router.push(redirectTo), 100);
			// }
			onClose();
		} catch (error: unknown) {
			const errorMessage =
				error instanceof AxiosError
					? (error.response?.data as { error?: string })?.error ||
					  (typeof error.response?.data === "string"
							? error.response.data
							: "Invalid OTP")
					: "Invalid OTP";
			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	// const handleSuccess = async (response: CredentialResponse) => {
	//     if (!response.credential) {
	//         triggerToast({
	//             title: "Login failed",
	//             description: "No credential received from Google.",
	//             variant: "destructive",
	//         });
	//         return;
	//     }
	//     try {
	//         const res = await apiClient.post("/auth/google-login", {
	//             token: response.credential,
	//         });
	//         const { user, tokens } = res.data.data;
	//         login(user, tokens.accessToken, tokens.refreshToken);
	//         queryClient.invalidateQueries({ queryKey: ["user"] });
	//         await aiChatService.clearGuestSession();
	//         triggerToast({
	//             title: "Login successful",
	//             description: `Welcome, ${user.name || user.phone}!`,
	//             variant: "success",
	//         });
	//         handlePostAuthRedirect();
	//     } catch (error) {
	//         console.error("Google login failed:", error);
	//         triggerToast({
	//             title: "Login failed",
	//             description: "Google login failed. Please try again.",
	//             variant: "destructive",
	//         });
	//     }
	// };

	if (!isOpen) return null;
	// ...existing code...
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50 dark:bg-black/70">
			<div className="relative w-full max-w-md mx-4">
				<Card className="w-full bg-white dark:bg-gray-900 dark:border-gray-800">
					<CardHeader className="relative mb-4">
						<button
							onClick={onClose}
							className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
							<X className="h-5 w-5 text-gray-900 dark:text-gray-100" />
						</button>
						<CardTitle className="text-center text-gray-900 dark:text-gray-100">
							Sign In
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-3 pt-2">
							<hr className="flex-grow border-gray-300 dark:border-gray-700" />
							<span className="text-gray-500 dark:text-gray-400">or</span>
							<hr className="flex-grow border-gray-300 dark:border-gray-700" />
						</div>
						{!step.isOtpSent ? (
							<form onSubmit={handleSendOtp} className="space-y-4">
								<div className="space-y-2">
									<Label
										htmlFor="phone"
										className="text-gray-900 dark:text-gray-100">
										Phone Number
									</Label>
									<div className="relative">
										<span className="absolute text-sm z-30 left-3 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100">
											+91
										</span>
										<Input
											id="phone"
											type="tel"
											placeholder="Enter phone number"
											value={step.phone}
											onChange={(e) => {
												let value = e.target.value.replace(/\D/g, "");
												if (value.length >= 10) {
													value = value.slice(-10);
												}
												if (value.length <= 10) {
													setStep({ ...step, phone: value });
												}
											}}
											className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
											required
										/>
									</div>
								</div>
								<Button
									type="submit"
									className="w-full bg-blue-600 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-900"
									disabled={loading}>
									{loading ? "Sending OTP..." : "Send OTP"}
								</Button>
							</form>
						) : (
							<form onSubmit={handleVerifyOtp} className="space-y-4">
								<div className="space-y-2">
									<span className="text-sm text-green-600 dark:text-green-400">
										{" "}
										Your OTP is: {step.recievedOtp}
									</span>
									<label className="flex justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
										{isNewUser ? "Welcome" : "Welcome back!"} +91 {step.phone}
									</label>
									{isNewUser && (
										<DropdownMenu>
											<Label
												htmlFor="role"
												className="text-gray-900 dark:text-gray-100">
												Role
											</Label>
											<DropdownMenuTrigger asChild>
												<Button
													variant="outline"
													className="w-full justify-between capitalize bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
													{step.role || "Select role"}
													<ChevronDown className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-[19rem] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
												<DropdownMenuItem
													onClick={() => setStep({ ...step, role: "admin" })}
													className="text-gray-900 dark:text-gray-100">
													Admin
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => setStep({ ...step, role: "agent" })}
													className="text-gray-900 dark:text-gray-100">
													Agent
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									)}
									<Label
										htmlFor="otp"
										className="text-gray-900 dark:text-gray-100">
										Enter OTP
									</Label>
									<Input
										id="otp"
										type="text"
										placeholder="Enter OTP received"
										value={step.otp}
										onChange={(e) => setStep({ ...step, otp: e.target.value })}
										className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
										required
									/>
								</div>
								<Button
									type="submit"
									className="w-full bg-blue-600 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-900"
									disabled={loading}>
									{loading ? "Verifying..." : "Verify & Login"}
								</Button>
								<Button
									type="button"
									variant="ghost"
									className="w-full text-gray-900 dark:text-gray-100"
									onClick={() =>
										setStep({
											phone: "",
											otp: "",
											isOtpSent: false,
											role: "",
											recievedOtp: "",
										})
									}>
									Change phone number
								</Button>
							</form>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
	// ...existing code...
};

export default AuthModal;
