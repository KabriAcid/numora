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
			description: "Buy airtime for all networks",
			icon: Phone,
			path: "/airtime",
			color: "bg-blue-50 text-blue-600",
			hoverColor: "hover:bg-blue-100",
		},
		{
			id: "data",
			title: "Data",
			description: "Purchase data bundles",
			icon: Wifi,
			path: "/data",
			color: "bg-green-50 text-green-600",
			hoverColor: "hover:bg-green-100",
		},
		{
			id: "airtime-to-cash",
			title: "Airtime to Cash",
			description: "Convert airtime to cash",
			icon: ArrowRightLeft,
			path: "/airtime-to-cash",
			color: "bg-orange-50 text-orange-600",
			hoverColor: "hover:bg-orange-100",
		},
	];

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
			{services.map((service) => {
				const Icon = service.icon;
				return (
					<button
						key={service.id}
						onClick={() => router.push(service.path)}
						className={`bg-white rounded-lg p-4 sm:p-5 min-h-32 shadow-sm ${service.hoverColor} transition-all duration-200 hover:shadow-md text-left group`}
					>
						<div
							className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-105`}
						>
							<Icon className="w-6 h-6" />
						</div>
						<h3 className="font-semibold text-[#13070C] mb-1">
							{service.title}
						</h3>
						<p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
							{service.description}
						</p>
					</button>
				);
			})}
		</div>
	);
};

export default ServiceGrid;
