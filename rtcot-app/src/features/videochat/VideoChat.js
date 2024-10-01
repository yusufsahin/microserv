// src/features/videochat/VideoChat.js
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const VideoChat = () => {
  const [socket, setSocket] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    // Connect to the signaling server using Socket.io
    const socketInstance = io('http://localhost:3004');  // Your WebSocket server
    setSocket(socketInstance);

    // Create a new RTCPeerConnection
    const peerConnection = new RTCPeerConnection();

    // Get the local media stream (video/audio)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketInstance.emit('ice-candidate', event.candidate);
      }
    };

    // Handle remote video stream
    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Handle offer from another peer
    socketInstance.on('offer', async (offer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socketInstance.emit('answer', answer);
    });

    // Handle answer from another peer
    socketInstance.on('answer', async (answer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // Handle ICE candidate from another peer
    socketInstance.on('ice-candidate', async (candidate) => {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    peerConnectionRef.current = peerConnection;

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Function to start the call
  const startCall = async () => {
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit('offer', offer);
  };

  return (
    <div>
      <h1>WebRTC Video Chat</h1>
      <div>
        <video ref={localVideoRef} autoPlay muted style={{ width: '300px', border: '1px solid black' }}></video>
        <video ref={remoteVideoRef} autoPlay style={{ width: '300px', border: '1px solid black' }}></video>
      </div>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoChat;

