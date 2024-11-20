import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, FileText, Settings, HelpCircle, Search, Menu, X } from 'lucide-react';

const NavLink = ({ icon: Icon, text, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium text-white 
        ${isActive ? 'bg-amazon-lightBlue text-amazon-orange' : 'hover:text-amazon-orange hover:bg-amazon-lightBlue'} 
        rounded-md`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {text}
    </Link>
  );
};

const SearchBar = () => (
  <div className="flex items-center rounded-md bg-amazon-lightBlue px-4 py-2 max-w-xs">
    <Search className="h-5 w-5 text-gray-400 min-w-[20px]" />
    <input
      type="text"
      placeholder="Search shipments..."
      className="ml-2 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none w-full"
    />
  </div>
);

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-amazon-blue">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold">
                SMB Exports
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <NavLink icon={Package} text="Shipments" to="/shipments" />
              <NavLink icon={FileText} text="Documents" to="/documents" />
              <NavLink icon={Settings} text="Settings" to="/settings" />
              <NavLink icon={HelpCircle} text="Help" to="/help" />
            </div>
          </div>

          {/* Search and Mobile Menu Button */}
          <div className="flex items-center">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden ml-4 text-white hover:text-amazon-orange"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink icon={Package} text="Shipments" to="/shipments" onClick={toggleMobileMenu} />
              <NavLink icon={FileText} text="Documents" to="/documents" onClick={toggleMobileMenu} />
              <NavLink icon={Settings} text="Settings" to="/settings" onClick={toggleMobileMenu} />
              <NavLink icon={HelpCircle} text="Help" to="/help" onClick={toggleMobileMenu} />
            </div>
            <div className="px-2 pb-3">
              <SearchBar />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;