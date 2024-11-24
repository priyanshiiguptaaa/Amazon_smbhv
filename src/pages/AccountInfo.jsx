import React from 'react';
import { User, Mail, Phone, Building, ExternalLink } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

const AccountInfo = () => {
    const { user } = useAuth();

    const openAmazonAccount = () => {
        window.open('https://sellercentral.amazon.in', '_blank');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg">
                {/* Profile Header */}
                <div className="px-4 py-5 sm:px-6 border-b">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your account details and connected services
                    </p>
                </div>

                {/* Profile Content */}
                <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                        {/* User Info Section */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">{user?.name || 'User Name'}</h4>
                                    <p className="text-sm text-gray-500">Account Owner</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600">{user?.email || 'email@example.com'}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600">{user?.phone || '+91 XXXXXXXXXX'}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Building className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600">{user?.company || 'Company Name'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Connected Accounts Section */}
                        <div className="mt-8">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h4>
                            <div className="border rounded-lg overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 flex items-center justify-between bg-gray-50">
                                    <div className="flex items-center space-x-3">
                                        <img 
                                            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" 
                                            alt="Amazon Logo" 
                                            className="w-8 h-8"
                                        />
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-900">Amazon Seller Account</h5>
                                            <p className="text-xs text-gray-500">Manage your Amazon seller profile</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={openAmazonAccount}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Open Account <ExternalLink className="ml-2 -mr-0.5 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
                            <button className="mb-3 sm:mb-0 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Update Profile
                            </button>
                            <button className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
