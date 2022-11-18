const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socket(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Run when client connects
io.on('connection', socket =>{
    console.log('New WS Connection...');
});
const PORT = 3006 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));