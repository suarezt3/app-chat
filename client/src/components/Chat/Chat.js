import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

import InfoBar from '../infoBar.js/infoBar';

import './Chat.css';


let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

    
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
           
        });

        return () => {
            socket.emit('disconnect');
            
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', () => {
            setMessages([...messages, message])
        })
    }, [messages])

    //! Funcion para enviar mensajes
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);

    return (
        <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
        </div>
        
      </div>
    )
}

export default Chat;