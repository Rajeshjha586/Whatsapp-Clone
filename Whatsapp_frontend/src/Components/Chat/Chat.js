import React, {useState} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from '../../axios';
import SendIcon from '@material-ui/icons/Send';
import './Chat.css';
function Chat({ messages }) {
    const [input,setInput] = useState("");

    const sendMessage= async(e) => {
        e.preventDefault();

        if(input){
            await axios.post("/messages/new",{
                
                message: input,
                name: "Demo",
                timeStamp : `${new Date().getHours()}:${new Date().getMinutes()}`,
                received: false
            });
        }
        

        setInput("");

    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3 className='chat-room-name'>Room Name</h3>
                    <p>Last Seen at....</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>


            <div className="chat__body">
                {messages.map( (message) => (
                    <p className={`chat__message ${message.received && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))}
                
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                
                <form>
                    <input placeholder="Type a message" type="text"
                    value={input} 
                    onChange={(e)=>setInput(e.target.value)}
                    />
                    <button type="submit" onClick={sendMessage}>
                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </button>
                </form>

                <IconButton>
                    <MicIcon />
                </IconButton>
                
            </div>
        </div>
    )
}

export default Chat
