import React, { useState } from 'react';
import { HelpCircle, ExternalLink } from 'lucide-react';
import TaxRegulationsComponent from '../components/TaxRegulations';

const HelpSection = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-medium text-[#0F1111] mb-4 flex items-center gap-2">
      <HelpCircle className="h-5 w-5 text-[#FF9900]" />
      {title}
    </h2>
    {children}
  </div>
);

const Help = () => {
  const [showTaxRegulations, setShowTaxRegulations] = useState(false);

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-medium text-[#0F1111] mb-2">Help Center</h1>
          <p className="text-[#565959]">Find answers to common questions and learn how to use the platform</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <HelpSection title="Getting Started">
            <div className="prose prose-sm max-w-none text-[#0F1111]">
              <p className="mb-4">
                Welcome to the Amazon SMB Export Platform! This guide will help you understand how to use our platform effectively.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[#0F1111]">
                <li>Set up your business profile with accurate information</li>
                <li>Upload required documentation for verification</li>
                <li>Add your product inventory</li>
                <li>Start managing your export orders</li>
              </ul>
            </div>
          </HelpSection>

          <HelpSection title="Document Management">
            <div className="prose prose-sm max-w-none text-[#0F1111]">
              <p className="mb-4">
                Learn how to manage your business documents effectively:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[#0F1111]">
                <li>Upload and organize business documents</li>
                <li>Track document verification status</li>
                <li>Update expired documents</li>
                <li>Download verification certificates</li>
              </ul>
            </div>
          </HelpSection>

          <HelpSection title="Inventory Management">
            <div className="prose prose-sm max-w-none text-[#0F1111]">
              <p className="mb-4">
                Efficiently manage your product inventory:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[#0F1111]">
                <li>Add and update product listings</li>
                <li>Track stock levels</li>
                <li>Set up low stock alerts</li>
                <li>Manage product categories</li>
              </ul>
            </div>
          </HelpSection>

          <HelpSection title="Order Processing">
            <div className="prose prose-sm max-w-none text-[#0F1111]">
              <p className="mb-4">
                Handle your export orders efficiently:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[#0F1111]">
                <li>View and manage incoming orders</li>
                <li>Process shipments</li>
                <li>Track order status</li>
                <li>Handle returns and refunds</li>
              </ul>
            </div>
          </HelpSection>

          <HelpSection title="Tax & Duty Regulations">
            <div className="prose prose-sm max-w-none text-[#0F1111]">
              <p className="mb-4">
                Understand tax obligations and duty regulations for different countries:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[#0F1111] mb-4">
                <li>Import duties and tariffs</li>
                <li>VAT and sales tax requirements</li>
                <li>Documentation and compliance</li>
                <li>Restricted items and special permits</li>
              </ul>
              <button
                onClick={() => setShowTaxRegulations(!showTaxRegulations)}
                className="bg-[#FF9900] text-white px-4 py-2 rounded hover:bg-[#FF9900]/90 transition-colors mb-4"
              >
                {showTaxRegulations ? 'Hide Regulations' : 'View Regulations'}
              </button>
              {showTaxRegulations && (
                <div className="mt-4 border rounded-lg p-4">
                  <TaxRegulationsComponent />
                </div>
              )}
            </div>
          </HelpSection>

          <HelpSection title="Additional Resources">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="#"
                className="block p-4 border border-[#D5D9D9] rounded-lg hover:border-[#FF9900] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#0F1111]">Documentation</h3>
                  <ExternalLink className="h-4 w-4 text-[#565959]" />
                </div>
                <p className="text-sm text-[#565959]">
                  Detailed guides and API documentation
                </p>
              </a>

              <a
                href="https://en.wikipedia.org/wiki/International_trade_law"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-[#D5D9D9] rounded-lg hover:border-[#FF9900] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#0F1111]">International Trade Laws</h3>
                  <ExternalLink className="h-4 w-4 text-[#565959]" />
                </div>
                <p className="text-sm text-[#565959]">
                  Learn about country-specific regulations and trade laws
                </p>
              </a>

              <a
                href="#"
                className="block p-4 border border-[#D5D9D9] rounded-lg hover:border-[#FF9900] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#0F1111]">Support</h3>
                  <ExternalLink className="h-4 w-4 text-[#565959]" />
                </div>
                <p className="text-sm text-[#565959]">
                  Contact our support team
                </p>
              </a>

              <a
                href="#"
                className="block p-4 border border-[#D5D9D9] rounded-lg hover:border-[#FF9900] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#0F1111]">FAQ</h3>
                  <ExternalLink className="h-4 w-4 text-[#565959]" />
                </div>
                <p className="text-sm text-[#565959]">
                  Frequently asked questions
                </p>
              </a>

              <a
                href="#"
                className="block p-4 border border-[#D5D9D9] rounded-lg hover:border-[#FF9900] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#0F1111]">Community</h3>
                  <ExternalLink className="h-4 w-4 text-[#565959]" />
                </div>
                <p className="text-sm text-[#565959]">
                  Join our seller community
                </p>
              </a>
            </div>
          </HelpSection>
        </div>
      </div>
    </div>
  );
};

export default Help;