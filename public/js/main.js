const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get user name and the rrom
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// console.log(username,room)

const socket = io();

// Join Chatroom
socket.emit("joinRoom", { username, room });

// Get room from users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});


// Message from server
socket.on("message", (message) => {
  console.log(message);

  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// create an event listener for the submission of the form
// Message submit

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get message text
  const msg = e.target.elements.msg.value;
  // Emmit the message to server
  socket.emit("chatMessage", msg);

  //Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//Output message from DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class= "meta"> ${message.username}<span> ${message.time}</span> </p>
  <p class="test">
  ${message.text}
  </p>`;
  // we dont have id here so we want  to collect the class
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}
// Add users to DOM
function outputUsers(users) {
  // it is diffrerent because i will add an array
  userList.innerHTML = `
  ${users.map(
    (user) => `<li>
  ${user.username}</li>`
  ).join('')}`;
}
