"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Phone, Wifi, ArrowRightLeft } from "lucide-react";

const ServiceGrid: React.FC = () => {
	const router = useRouter();

	const services = [
		{
			id: "airtime",
			title: "Airtime",
			icon: Phone,
			path: "/airtime",
			color: "bg-blue-50 text-blue-600",
			hoverColor: "hover:bg-blue-100",
		},
		{
			id: "data",
			title: "Data",
			icon: Wifi,
			path: "/data",
			color: "bg-green-50 text-green-600",
			hoverColor: "hover:bg-green-100",
		},
		{
			id: "airtime-to-cash",
			title: "Airtime to Cash",
			icon: ArrowRightLeft,
			path: "/airtime-to-cash",
			color: "bg-orange-50 text-orange-600",
			hoverColor: "hover:bg-orange-100",
		},
	];

	return (
		<div className="grid grid-cols-3 gap-2 sm:gap-3">
			{services.map((service) => {
				const Icon = service.icon;
				return (
					<button
						key={service.id}
						onClick={() => router.push(service.path)}
						className={`cursor-pointer bg-white rounded-xl p-3 border border-gray-100 ${service.hoverColor} transition-all duration-200 text-left group`}
					>
						<div
							className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${service.color} flex items-center justify-center mx-auto mb-2 transition-transform group-hover:scale-105`}
						>
							<Icon className="w-4 h-4 sm:w-5 sm:h-5" />
						</div>
						<h3 className="text-center text-xs sm:text-sm font-semibold text-[#13070C] leading-tight">
							{service.title}
						</h3>
					</button>
				);
			})}
		</div>
	);
};

export default ServiceGrid;
