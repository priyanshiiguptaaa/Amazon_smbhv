import React, { useState } from 'react';
import { Bell, Package, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const mockNotifications = [
    {
        id: 1,
        type: 'shipment',
        title: 'Shipment Cleared Customs',
        message: 'Your shipment #SH789021 has cleared customs in Mumbai Port. Expected delivery in 2 days.',
        timestamp: '2 hours ago',
        status: 'success',
        unread: true
    },
    {
        id: 2,
        type: 'document',
        title: 'Document Update Required',
        message: 'Please update the Certificate of Origin for shipment #SH789022. This is required for customs clearance.',
        timestamp: '5 hours ago',
        status: 'warning',
        unread: true
    },
    {
        id: 3,
        type: 'shipment',
        title: 'Shipment Delay',
        message: 'Shipment #SH789020 is experiencing a delay due to port congestion. New ETA: July 15, 2023',
        timestamp: '1 day ago',
        status: 'error',
        unread: false
    },
    {
        id: 4,
        type: 'document',
        title: 'Documents Approved',
        message: 'All documents for shipment #SH789019 have been approved by customs.',
        timestamp: '2 days ago',
        status: 'success',
        unread: false
    }
];

const NotificationIcon = ({ type, status }) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center";
    const statusColors = {
        success: "bg-green-100 text-green-600",
        warning: "bg-yellow-100 text-yellow-600",
        error: "bg-red-100 text-red-600",
        default: "bg-blue-100 text-blue-600"
    };

    const icons = {
        shipment: Package,
        document: FileText,
        alert: AlertCircle
    };

    const Icon = icons[type] || Bell;
    const colorClass = statusColors[status] || statusColors.default;

    return (
        <div className={`${baseClasses} ${colorClass}`}>
            <Icon className="w-5 h-5" />
        </div>
    );
};

const NotificationCard = ({ notification, onClick }) => {
    const { type, title, message, timestamp, status, unread } = notification;
    
    return (
        <div 
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${unread ? 'bg-blue-50' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-start space-x-4">
                <NotificationIcon type={type} status={status} />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium text-gray-900 ${unread ? 'font-semibold' : ''}`}>
                            {title}
                        </p>
                        <span className="text-xs text-gray-500">{timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{message}</p>
                </div>
            </div>
        </div>
    );
};

const FilterButton = ({ active, children, onClick }) => (
    <button
        className={`px-4 py-2 text-sm font-medium rounded-md ${
            active 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        onClick={onClick}
    >
        {children}
    </button>
);

const Assistance = () => {
    const [filter, setFilter] = useState('all');
    const [notifications, setNotifications] = useState(mockNotifications);

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        if (filter === 'unread') return notification.unread;
        return notification.type === filter;
    });

    const markAsRead = (notificationId) => {
        setNotifications(notifications.map(notification => 
            notification.id === notificationId 
                ? { ...notification, unread: false }
                : notification
        ));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">Notifications Center</h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {notifications.filter(n => n.unread).length} Unread
                        </span>
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <FilterButton 
                            active={filter === 'all'} 
                            onClick={() => setFilter('all')}
                        >
                            All
                        </FilterButton>
                        <FilterButton 
                            active={filter === 'unread'} 
                            onClick={() => setFilter('unread')}
                        >
                            Unread
                        </FilterButton>
                        <FilterButton 
                            active={filter === 'shipment'} 
                            onClick={() => setFilter('shipment')}
                        >
                            Shipments
                        </FilterButton>
                        <FilterButton 
                            active={filter === 'document'} 
                            onClick={() => setFilter('document')}
                        >
                            Documents
                        </FilterButton>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No notifications found
                        </div>
                    ) : (
                        filteredNotifications.map(notification => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                onClick={() => markAsRead(notification.id)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assistance;
