"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/lib/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { X } from "lucide-react";
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

	// const handlePostAuthRedirect = () => {
	// 	if (redirectTo) {
	// 		if (redirectTo.startsWith("/seller")) {
	// 			setUserMode("seller");
	const [isNewUser, setIsNewUser] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailPasswordLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginMutation.mutate({ email, password });
	};
	// 		}
	// 		setTimeout(() => {
	// 			router.push(redirectTo);
	// 		}, 100);
	// 	}
	// 	onClose();
	// };

	const loginMutation = useMutation({
		mutationFn: async (data: LoginData) => {
			const response = await apiClient.post("/admin/login", data);
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

	// const handleSendOtp = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	if (!step.phone) {
	// 		toast({
	// 			title: "Validation Error",
	// 			description: "Enter phone number",
	// 			variant: "destructive",
	// 		});
	// 		return;
	// 	}
	// 	const phoneRegex = /^[6-9]\d{9}$/;
	// 	if (!phoneRegex.test(step.phone)) {
	// 		toast({
	// 			title: "Validation Error",
	// 			description: "Enter a valid phone number",
	// 			variant: "destructive",
	// 		});
	// 		return;
	// 	}
	// 	setLoading(true);
	// 	try {
	// 		const res = await apiClient.post("/auth/send-otp", {
	// 			phone: step.phone,
	// 		});
	// 		setIsNewUser(res.data.data.isNewUser);
	// 		setStep((prev) => ({
	// 			...prev,
	// 			isOtpSent: true,
	// 			recievedOtp: res.data.data.otp,
	// 		}));
	// 		toast({
	// 			title: "OTP sent",
	// 			description: "Check your SMS for the OTP.",
	// 		});

	// 		if (res.data.success !== true) {
	// 			toast({
	// 				title: "Error",
	// 				description: "Failed to send OTP",
	// 				variant: "destructive",
	// 			});
	// 		}
	// 	} catch (error: unknown) {
	// 		const axiosError = error as AxiosError;
	// 		const errorData = axiosError.response?.data;
	// 		const errorMessage =
	// 			typeof errorData === "object" &&
	// 			errorData !== null &&
	// 			"error" in errorData
	// 				? (errorData as { error: string }).error
	// 				: "Failed to send OTP";
	// 		toast({
	// 			title: "Error",
	// 			description: errorMessage,
	// 			variant: "destructive",
	// 		});
	// 	}
	// 	setLoading(false);
	// };

	// const handleVerifyOtp = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	if (!step.otp) {
	// 		toast({
	// 			title: "Validation Error",
	// 			description: "Enter OTP",
	// 			variant: "destructive",
	// 		});
	// 		return;
	// 	}
	// 	setLoading(true);
	// 	const payload = {
	// 		phone: step.phone,
	// 		otp: step.otp,
	// 		...(isNewUser && { role: step.role }),
	// 	};

	// 	try {
	// 		const response = await apiClient.post("/auth/verify-otp", payload);

	// 		const { user, tokens } = response.data.data;
	// 		login(user, tokens.accessToken, tokens.refreshToken);
	// 		queryClient.invalidateQueries({ queryKey: ["user"] });
	// 		toast({
	// 			title: "Login successful",
	// 			description: `Welcome, ${user.name || user.phone}!`,
	// 		});
	// 		// if (redirectTo) {
	// 		// 	if (redirectTo.startsWith("/seller")) setUserMode("seller");
	// 		// 	else if (redirectTo.startsWith("/buyer")) setUserMode("buyer");
	// 		// 	setTimeout(() => router.push(redirectTo), 100);
	// 		// }
	// 		onClose();
	// 	} catch (error: unknown) {
	// 		const errorMessage =
	// 			error instanceof AxiosError
	// 				? (error.response?.data as { error?: string })?.error ||
	// 				  (typeof error.response?.data === "string"
	// 						? error.response.data
	// 						: "Invalid OTP")
	// 				: "Invalid OTP";
	// 		toast({
	// 			title: "Error",
	// 			description: errorMessage,
	// 			variant: "destructive",
	// 		});
	// 	}
	// 	setLoading(false);
	// };

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
							<form onSubmit={handleEmailPasswordLogin} className="w-full">
								<div className="space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="email"
											className="text-gray-900 dark:text-gray-100">
											Email Address
										</Label>
										<Input
											id="email"
											type="email"
											placeholder="Enter your email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
											required
										/>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="password"
											className="text-gray-900 dark:text-gray-100">
											Password
										</Label>
										<Input
											id="password"
											type="password"
											placeholder="Enter your password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
											required
										/>
									</div>
									<Button
										type="submit"
										disabled={loginMutation.isPending}
										className="w-full bg-blue-600 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-900">
										{loginMutation.isPending ? "Logging in..." : "Login"}
									</Button>
								</div>
							</form>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
	// ...existing code...
};

export default AuthModal;
