import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Wifi,
  Tv,
  Zap,
  GraduationCap,
  ArrowRightLeft,
  Target,
} from "lucide-react"

const ServiceGrid: React.FC = () => {
  const navigate = useNavigate();

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
      id: "tv",
      title: "TV Bills",
      description: "Pay for cable subscriptions",
      icon: Tv,
      path: "/tv",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
    {
      id: "electricity",
      title: "Electricity",
      description: "Pay electricity bills",
      icon: Zap,
      path: "/electricity",
      color: "bg-yellow-50 text-yellow-600",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      id: "education",
      title: "Education",
      description: "WAEC, JAMB & more",
      icon: GraduationCap,
      path: "/education",
      color: "bg-indigo-50 text-indigo-600",
      hoverColor: "hover:bg-indigo-100",
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
    {
      id: "betting",
      title: "Betting",
      description: "Fund betting wallets",
      icon: Target,
      path: "/betting",
      color: "bg-red-50 text-red-600",
      hoverColor: "hover:bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <button
            key={service.id}
            onClick={() => navigate(service.path)}
            className={`bg-white rounded-2xl p-6 shadow-sm ${service.hoverColor} transition-all duration-200 hover:shadow-md hover:scale-105 text-left group`}
          >
            <div
              className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-[#13070C] mb-1">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default ServiceGrid;
