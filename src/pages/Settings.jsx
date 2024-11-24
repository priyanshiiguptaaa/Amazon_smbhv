import React from 'react';
import { Save, User, Building, Bell, Globe } from 'lucide-react';

const SettingsSection = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-6">
    <div className="mb-4">
      <h2 className="text-lg font-medium flex items-center text-[#0F1111]">
        <Icon className="h-5 w-5 mr-2 text-[#FF9900]" />
        {title}
      </h2>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-medium text-[#0F1111] mb-2">Settings</h1>
          <p className="text-[#565959]">Manage your account and preferences</p>
        </div>

        <SettingsSection icon={User} title="Profile Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Building} title="Company Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Company Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Business Address</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
                placeholder="Enter business address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Tax ID</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
                placeholder="Enter tax ID"
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Globe} title="Export Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Default Currency</label>
              <select
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
              >
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
                <option>INR - Indian Rupee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F1111]">Preferred Shipping Method</label>
              <select
                className="mt-1 block w-full rounded-md border-[#D5D9D9] shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900] sm:text-sm"
              >
                <option>Standard Shipping</option>
                <option>Express Shipping</option>
                <option>Economy Shipping</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Bell} title="Notification Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-[#0F1111]">Email Notifications</label>
                <p className="text-sm text-[#565959]">Receive updates via email</p>
              </div>
              <button 
                className="bg-[#FF9900] relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:ring-offset-2"
              >
                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-[#0F1111]">SMS Notifications</label>
                <p className="text-sm text-[#565959]">Receive updates via SMS</p>
              </div>
              <button 
                className="bg-[#D5D9D9] relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:ring-offset-2"
              >
                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </SettingsSection>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;