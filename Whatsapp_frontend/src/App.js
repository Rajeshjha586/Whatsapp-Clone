import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/Sidebar/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios'

function App() {
  const [messages,setMessages] = useState([]);
  useEffect(() => {
      axios.get('/messages/sync')
      .then(res => {
          setMessages(res.data);
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('4103edc4b72b0ea37b71', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        {/**SideBar */}
        <Sidebar />
        
        {/**Chat Component */}
        <Chat messages={messages}/>
      </div>
      

    </div>
  );
}

export default App;
