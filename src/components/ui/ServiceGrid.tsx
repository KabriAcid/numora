import React from 'react';
import { useNavigate } from 'react-router-dom';
import airtimeIcon from '../../assets/icons/airtel-logo1.png';
import dataIcon from '../../assets/icons/mtn.svg';
import tvIcon from '../../assets/icons/airtel-logo-white-text-vertical.jpg';
import electricityIcon from '../../assets/icons/glo.png';
import educationIcon from '../../assets/icons/9mobile.png';
import airtimeToCashIcon from '../../assets/icons/glo.png';
import bettingIcon from '../../assets/icons/mtn.svg';

const ServiceGrid: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'airtime',
      title: 'Airtime',
      description: 'Buy airtime for all networks',
      icon: airtimeIcon,
      path: '/airtime',
      color: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'data',
      title: 'Data',
      description: 'Purchase data bundles',
      icon: dataIcon,
      path: '/data',
      color: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      id: 'tv',
      title: 'TV Bills',
      description: 'Pay for cable subscriptions',
      icon: tvIcon,
      path: '/tv',
      color: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      id: 'electricity',
      title: 'Electricity',
      description: 'Pay electricity bills',
      icon: electricityIcon,
      path: '/electricity',
      color: 'bg-yellow-50',
      hoverColor: 'hover:bg-yellow-100'
    },
    {
      id: 'education',
      title: 'Education',
      description: 'WAEC, JAMB & more',
      icon: educationIcon,
      path: '/education',
      color: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-100'
    },
    {
      id: 'airtime-to-cash',
      title: 'Airtime to Cash',
      description: 'Convert airtime to cash',
      icon: airtimeToCashIcon,
      path: '/airtime-to-cash',
      color: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100'
    },
    {
      id: 'betting',
      title: 'Betting',
      description: 'Fund betting wallets',
      icon: bettingIcon,
      path: '/betting',
      color: 'bg-red-50',
      hoverColor: 'hover:bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => navigate(service.path)}
          className={`bg-white rounded-2xl p-6 shadow-sm ${service.hoverColor} transition-all duration-200 hover:shadow-md hover:scale-105 text-left group`}
        >
          <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
            <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
          </div>
          <h3 className="font-semibold text-[#13070C] mb-1">{service.title}</h3>
          <p className="text-sm text-gray-600">{service.description}</p>
        </button>
      ))}
    </div>
  );
};

export default ServiceGrid;