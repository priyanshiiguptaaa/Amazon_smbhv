import React, { useState, useEffect } from 'react';
import { Send, Search, MoreVertical, Phone, Video, User, Anchor, Truck, Ship } from 'lucide-react';

const getInitials = (name) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
};

const getCarrierIcon = (name) => {
    const carrierTypes = {
        'Maersk Line': Ship,
        'DHL Express': Truck,
        'MSC Shipping': Anchor
    };
    return carrierTypes[name] || User;
};

const getCarrierColors = (name) => {
    const colors = {
        'Maersk Line': 'bg-blue-700 text-white',
        'DHL Express': 'bg-yellow-500 text-red-600',
        'MSC Shipping': 'bg-purple-700 text-white'
    };
    return colors[name] || 'bg-blue-100 text-blue-600';
};

const CarrierAvatar = ({ carrier, size = 'normal' }) => {
    const sizeClasses = {
        normal: 'w-12 h-12',
        small: 'w-10 h-10'
    };
    const IconComponent = getCarrierIcon(carrier.name);
    const colorClasses = getCarrierColors(carrier.name);

    return (
        <div className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center ${colorClasses}`}>
            <IconComponent className="w-6 h-6" />
            {carrier.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            )}
        </div>
    );
};

const mockCarriers = [
    {
        id: 1,
        name: "Maersk Line",
        lastMessage: "Your shipment #SH789021 is now at Mumbai Port",
        timestamp: "2h ago",
        online: true,
        messages: [
            {
                id: 1,
                senderId: 1,
                text: "Your shipment #SH789021 has arrived at Mumbai Port. Customs clearance will begin shortly.",
                timestamp: "10:30 AM",
                type: "received"
            },
            {
                id: 2,
                senderId: "user",
                text: "Thank you for the update. How long will the customs clearance take?",
                timestamp: "10:35 AM",
                type: "sent"
            },
            {
                id: 3,
                senderId: 1,
                text: "Usually it takes 2-3 business days. We'll keep you updated on the progress.",
                timestamp: "10:38 AM",
                type: "received"
            }
        ]
    },
    {
        id: 2,
        name: "DHL Express",
        lastMessage: "Documents received for shipment #SH789022",
        timestamp: "5h ago",
        online: true,
        messages: [
            {
                id: 1,
                senderId: 2,
                text: "We've received the documents for shipment #SH789022. However, there seems to be an issue with the Certificate of Origin.",
                timestamp: "9:15 AM",
                type: "received"
            },
            {
                id: 2,
                senderId: "user",
                text: "What's the issue with the certificate?",
                timestamp: "9:20 AM",
                type: "sent"
            },
            {
                id: 3,
                senderId: 2,
                text: "The stamp from the Chamber of Commerce is missing. Could you please provide an updated certificate?",
                timestamp: "9:22 AM",
                type: "received"
            },
            {
                id: 4,
                senderId: "user",
                text: "I'll get that sorted right away. How should I send the updated certificate?",
                timestamp: "9:25 AM",
                type: "sent"
            },
            {
                id: 5,
                senderId: 2,
                text: "You can upload it directly through our portal or email it to documents@dhl.com",
                timestamp: "9:28 AM",
                type: "received"
            }
        ]
    },
    {
        id: 3,
        name: "MSC Shipping",
        lastMessage: "Container loaded for shipment #SH789020",
        timestamp: "1d ago",
        online: false,
        messages: [
            {
                id: 1,
                senderId: 3,
                text: "Container MSCU7654321 has been loaded onto vessel MSC ISABELLA for shipment #SH789020",
                timestamp: "Yesterday, 3:45 PM",
                type: "received"
            },
            {
                id: 2,
                senderId: "user",
                text: "Great! What's the estimated arrival date at Rotterdam port?",
                timestamp: "Yesterday, 4:00 PM",
                type: "sent"
            },
            {
                id: 3,
                senderId: 3,
                text: "The vessel is scheduled to arrive at Rotterdam on August 15th. Transit time is approximately 28 days.",
                timestamp: "Yesterday, 4:05 PM",
                type: "received"
            },
            {
                id: 4,
                senderId: "user",
                text: "Will there be any transshipment stops?",
                timestamp: "Yesterday, 4:10 PM",
                type: "sent"
            },
            {
                id: 5,
                senderId: 3,
                text: "Yes, there will be one transshipment at Singapore port. This is already factored into the transit time.",
                timestamp: "Yesterday, 4:15 PM",
                type: "received"
            }
        ]
    }
];

const CarrierList = ({ carriers, activeCarrier, setActiveCarrier }) => (
    <div className="w-80 border-r bg-gray-50">
        <div className="p-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search carriers..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
            {carriers.map(carrier => (
                <div
                    key={carrier.id}
                    className={`p-4 cursor-pointer hover:bg-gray-100 ${activeCarrier?.id === carrier.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setActiveCarrier(carrier)}
                >
                    <div className="flex items-center space-x-3">
                        <CarrierAvatar carrier={carrier} />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {carrier.name}
                                </p>
                                <span className="text-xs text-gray-500">{carrier.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{carrier.lastMessage}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ChatHeader = ({ carrier }) => (
    <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
            <CarrierAvatar carrier={carrier} size="small" />
            <div>
                <h2 className="text-lg font-medium text-gray-900">{carrier.name}</h2>
                <p className="text-sm text-gray-500">
                    {carrier.online ? 'Online' : 'Offline'}
                </p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
                <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
                <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
                <MoreVertical className="w-5 h-5" />
            </button>
        </div>
    </div>
);

const MessageBubble = ({ message }) => (
    <div className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[70%] ${message.type === 'sent' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg px-4 py-2`}>
            <p className="text-sm">{message.text}</p>
            <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
        </div>
    </div>
);

const Messages = () => {
    const [activeCarrier, setActiveCarrier] = useState(mockCarriers[0]);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState(activeCarrier.messages);

    useEffect(() => {
        setMessages(activeCarrier.messages);
    }, [activeCarrier]);

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            senderId: 'user',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'sent'
        };

        setMessages([...messages, message]);
        setNewMessage('');

        setTimeout(() => {
            const responses = {
                1: "I'll check with the customs department and update you on the progress.",
                2: "Let me verify that with our documentation team and get back to you shortly.",
                3: "I'll check the vessel tracking system and confirm the details for you."
            };

            const response = {
                id: messages.length + 2,
                senderId: activeCarrier.id,
                text: responses[activeCarrier.id] || "I'll check and get back to you on this shortly.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'received'
            };
            setMessages(prev => [...prev, response]);
        }, 2000);
    };

    return (
        <div className="flex h-[calc(100vh-5rem)]">
            <CarrierList 
                carriers={mockCarriers} 
                activeCarrier={activeCarrier} 
                setActiveCarrier={setActiveCarrier} 
            />
            
            {activeCarrier ? (
                <div className="flex-1 flex flex-col">
                    <ChatHeader carrier={activeCarrier} />
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map(message => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                    </div>

                    <div className="p-4 border-t">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                onClick={handleSend}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Select a carrier to start messaging</p>
                </div>
            )}
        </div>
    );
};

export default Messages;
