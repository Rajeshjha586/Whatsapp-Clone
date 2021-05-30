import React from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {SearchOutlined} from "@material-ui/icons";
import {Avatar, IconButton} from '@material-ui/core';


import './Sidebar.css';
import SidebarChat from '../SidebarChat/SidebarChat';


function Sidebar() {
    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src="https://user-images.githubusercontent.com/70096180/105625553-10f7c500-5e50-11eb-8370-290a2c7b7cda.jpg" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
