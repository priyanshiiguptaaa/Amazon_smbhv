import React, { useState, useEffect, useRef } from 'react';
import { initializeVideoCall } from '../utils/communicationUtils';
import { Camera, CameraOff, Mic, MicOff, PhoneOff, Users, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const VideoConference = ({ roomId, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRefs = useRef({});

  useEffect(() => {
    const initializeCall = async () => {
      try {
        setIsConnecting(true);
        const config = await initializeVideoCall(roomId);
        
        // Get user media
        const stream = await navigator.mediaDevices.getUserMedia(config.constraints);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Mock participants (replace with actual WebRTC connections)
        setParticipants([
          { id: 'user1', name: 'John Doe', role: 'Supplier' },
          { id: 'user2', name: 'Jane Smith', role: 'Buyer' },
          { id: 'user3', name: 'Mike Johnson', role: 'Logistics' },
        ]);

        setIsConnecting(false);
      } catch (error) {
        console.error('Error setting up video call:', error);
        toast.error('Failed to initialize video call');
        onClose();
      }
    };

    initializeCall();

    return () => {
      // Cleanup video streams
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomId]);

  const toggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const audioTrack = localVideoRef.current.srcObject.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!isVideoOff);
      }
    }
  };

  const handleEndCall = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  if (isConnecting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-center mt-4">Connecting to video call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col z-50">
      {/* Main video grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Local video */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            You (Host)
          </div>
        </div>

        {/* Remote participants */}
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="relative bg-gray-800 rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">
                  {participant.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              {participant.name} ({participant.role})
            </div>
          </div>
        ))}
      </div>

      {/* Control bar */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-gray-600'
            } hover:bg-opacity-80 transition-colors`}
          >
            {isMuted ? (
              <MicOff className="text-white" />
            ) : (
              <Mic className="text-white" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoOff ? 'bg-red-500' : 'bg-gray-600'
            } hover:bg-opacity-80 transition-colors`}
          >
            {isVideoOff ? (
              <CameraOff className="text-white" />
            ) : (
              <Camera className="text-white" />
            )}
          </button>

          <button
            onClick={handleEndCall}
            className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          >
            <PhoneOff className="text-white" />
          </button>

          <button className="p-4 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors">
            <Users className="text-white" />
          </button>

          <button className="p-4 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors">
            <MessageCircle className="text-white" />
          </button>
        </div>
      </div>

      {/* Participant list */}
      <div className="absolute top-4 right-4 bg-gray-800 rounded-lg p-4 text-white">
        <h3 className="font-semibold mb-2">Participants ({participants.length + 1})</h3>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>You (Host)</span>
          </li>
          {participants.map((participant) => (
            <li key={participant.id} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{participant.name}</span>
              <span className="text-gray-400 text-sm">({participant.role})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoConference;
