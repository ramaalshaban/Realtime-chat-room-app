const chatForm = document.getElementById('chat-form');

const socket = io();

// Message from server
socket.on('message', (message) => {
  console.log(message);
});

// create an event listener for the submission of the form
// Message submit

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message text
  const msg = e.target.elements.msg.value;
  // Emmit the message to server
  socket.emit('chatMessage',msg);
});