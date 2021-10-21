const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('Tenemos una nueva conexion!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);

    });

    socket.on('disconnect', () => {
        console.log('El usuario se ha ido!!');
    })
});

app.use(router);

server.listen(PORT, () => console.log(`El servidor iniciado en el puerto ${PORT}`));
