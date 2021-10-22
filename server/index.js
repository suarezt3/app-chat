const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { addUser, removeUser, getUser, getUsersInRoom } = require ('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, Bienvenido a la sala ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, Te has conectado!`});

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('El usuario se ha ido!!');
    })
});

app.use(router);

server.listen(PORT, () => console.log(`El servidor iniciado en el puerto ${PORT}`));
