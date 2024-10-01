module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected: ', socket.id);
  
      // Handle SDP offers
      socket.on('offer', (offer) => {
        console.log('Offer received from', socket.id);
        socket.broadcast.emit('offer', offer); // Send offer to other peers
      });
  
      // Handle SDP answers
      socket.on('answer', (answer) => {
        console.log('Answer received from', socket.id);
        socket.broadcast.emit('answer', answer); // Send answer to other peers
      });
  
      // Handle ICE candidates
      socket.on('ice-candidate', (candidate) => {
        console.log('ICE candidate received from', socket.id);
        socket.broadcast.emit('ice-candidate', candidate); // Send candidate to other peers
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
      });
    });
  };
  