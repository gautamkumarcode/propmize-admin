"use client";

import AuthModal from "@/components/custom/auth-modal/AuthModal";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../../assests/logo.png";

export default function LandingPage() {
	const { isAuthenticated } = useAuthContext();
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/dashboard");
		}
	}, [isAuthenticated, router]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
			{/* Header */}
			<header className="w-full py-6 px-8 flex justify-between items-center">
				<div className="flex items-center">
					<Image
						src={logo}
						alt="Propmize Logo"
						width={40}
						height={40}
						className="mr-3"
					/>
					<h1 className="text-2xl font-bold text-slate-800">Propmize Admin</h1>
				</div>

				<button
					onClick={() => setShowModal(true)}
					className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
					Sign In
				</button>
			</header>

			{/* Main Content */}
			<main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-8 py-12 gap-16 max-w-7xl mx-auto">
				{/* Left Column - Text Content */}
				<div className="flex flex-col lg:w-5/12 text-left">
					<div className="mb-6">
						<span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full mb-4">
							ADMIN PORTAL
						</span>
						<h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
							Manage Your Real Estate Business with Precision
						</h1>
						<p className="text-lg text-slate-600 mb-8 leading-relaxed">
							Welcome to Propmize Admin Portal. Streamline your operations with
							our powerful tools for listings, agents, and client management—all
							in one secure dashboard.
						</p>
					</div>

					<div className="mb-10">
						<div className="flex items-center mb-4">
							<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
								<svg
									className="w-4 h-4 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<span className="text-slate-700 font-medium">
								Advanced listing management
							</span>
						</div>
						<div className="flex items-center mb-4">
							<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
								<svg
									className="w-4 h-4 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<span className="text-slate-700 font-medium">
								Comprehensive agent analytics
							</span>
						</div>
						<div className="flex items-center">
							<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
								<svg
									className="w-4 h-4 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<span className="text-slate-700 font-medium">
								Secure client relationship tools
							</span>
						</div>
					</div>

					<button
						onClick={() => setShowModal(true)}
						className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md w-full lg:w-auto">
						Access Admin Dashboard
					</button>
				</div>

				{/* Right Column - Image/Visual Content */}
				<div className="lg:w-[30rem]">
					<div className="relative">
						<div className="bg-white rounded-2xl shadow-xl p-1">
							<img
								src="/cozy-studio-loft.jpg"
								alt="Modern Property Dashboard"
								className="rounded-xl w-full h-auto"
							/>
						</div>

						{/* Floating stats cards */}
						<div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
							<div className="flex items-center">
								<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
									<svg
										className="w-6 h-6 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
										/>
									</svg>
								</div>
								<div>
									<p className="text-xs text-slate-500">Active Listings</p>
									<p className="font-bold text-slate-800">247</p>
								</div>
							</div>
						</div>

						<div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
							<div className="flex items-center">
								<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
									<svg
										className="w-6 h-6 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</div>
								<div>
									<p className="text-xs text-slate-500">Agents</p>
									<p className="font-bold text-slate-800">42</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="w-full py-6 text-center text-slate-500 text-sm">
				&copy; {new Date().getFullYear()} Propmize. All rights reserved.
			</footer>

			{/* Auth Modal */}
			{showModal && (
				<AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
			)}
		</div>
	);
}
