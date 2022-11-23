const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// create an event listener for the submission of the form
// Message submit

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message text
  const msg = e.target.elements.msg.value;
  // Emmit the message to server
  socket.emit('chatMessage',msg);

  //Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();

});


//Output message from DOM
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class= "meta"> Brad <span> now pm</span> </p>
  <p class="test">
  ${message}
  </p>`
// we dont have id here so we want  to collect the class
  document.querySelector('.chat-messages').appendChild(div);  
}