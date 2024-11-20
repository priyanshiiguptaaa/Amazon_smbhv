import React, { useState } from 'react';
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Phone, 
  Mail, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  Search,
  ExternalLink
} from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I track my shipment?",
      answer: "You can track your shipment by entering your tracking number in the search bar on our homepage. Alternatively, you can use our mobile app or contact our support team."
    },
    {
      question: "What shipping methods are available?",
      answer: "We offer various shipping methods including Express (1-2 days), Standard (3-5 days), and Economy (5-7 days). Available options may vary based on your location."
    },
    {
      question: "How can I change my delivery address?",
      answer: "To change your delivery address, please contact our support team at least 24 hours before the scheduled delivery. Changes after this window may not be possible."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer full refunds within 30 days of purchase. Items must be unused and in their original packaging. Shipping costs are non-refundable."
    }
  ];

  const documentationLinks = [
    { title: "Getting Started Guide", link: "#" },
    { title: "API Documentation", link: "#" },
    { title: "Shipping Guidelines", link: "#" },
    { title: "Integration Tutorial", link: "#" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers and get support</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-4 top-3.5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Documentation Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center text-blue-600">
                  <Book className="h-6 w-6 mr-2" />
                  Documentation
                </h2>
                <p className="text-gray-600 mt-2">Browse our comprehensive guides and tutorials</p>
              </div>
              <div className="space-y-3">
                {documentationLinks.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.link}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600">{doc.title}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Support Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center text-blue-600">
                  <MessageCircle className="h-6 w-6 mr-2" />
                  Live Chat Support
                </h2>
                <p className="text-gray-600 mt-2">Connect with our support team</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">Support available 24/7</p>
                <p className="text-sm text-gray-600">Average response time: 2 minutes</p>
              </div>
              <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center text-blue-600">
                  <Phone className="h-6 w-6 mr-2" />
                  Contact Us
                </h2>
                <p className="text-gray-600 mt-2">Get in touch with our support team</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Call us at</p>
                    <p className="text-gray-900">+1 (888) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email us at</p>
                    <p className="text-gray-900">support@company.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Visit us at</p>
                    <p className="text-gray-900">123 Business Street, Suite 100</p>
                    <p className="text-gray-900">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center text-blue-600">
                  <HelpCircle className="h-6 w-6 mr-2" />
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mt-2">Find quick answers to common questions</p>
              </div>
              <div className="divide-y divide-gray-200">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Resources */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-6">Our support team is here to assist you 24/7</p>
          <button className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors">
            Submit a Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;