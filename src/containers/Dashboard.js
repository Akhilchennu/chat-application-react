import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Contacts from '../components/Contacts.js';
import Searchinput from '../components/Searchinput';
import Header from '../components/Header';
import Nomessages from '../components/Nomessages';
import ChatContainer from './ChatContainer';
import { service } from '../services/service';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import openSocket from 'socket.io-client';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingRight: 0
    },
}));

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [chatId, setChatId] = useState('');
    const [contactName, setContactName] = useState('');
    const [contacts, setContacts] = useState([]);
    const [messageData, setMessageData] = useState({});
    const [searchContacts, setSearchResult] = useState(contacts);
    const [typingStatus, setTypingStatus] = useState({});
    const socket = openSocket('http://localhost:3001');//ws
    const userData = useSelector(state => state.userData || {});
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handler = () => {
        return messageData
    }

    useEffect(() => {
        const dataResponce = service.getUserList();
        dataResponce.then(async (response) => {
            if (response.success) {
                const initialMessageData = {};
                const typingUserStatus = {};
                response.users.forEach((user) => {
                    const userid = user["_id"];
                    initialMessageData[userid] = []
                    typingUserStatus[userid]=false;
                })
                setMessageData(initialMessageData);
                setTypingStatus(typingUserStatus);
                await dispatch({
                    type: "ALLUSERDATA",
                    allUsers: response.users
                })
                setContacts(response.users);
                setSearchResult(response.users);
            } else {
                props.history.push('/login');
            }
        });
        socket.emit('join', { userid: userData["_id"] });
        socket.on("new_msg", async (data) => {
            let newMessageData = {};
            let chatId = '';
            let typeData={};
            await setChatId(previousChatId => {
                chatId = previousChatId
            })
            await setMessageData(prevMessageData => {
                newMessageData = { ...prevMessageData }
            })
            await setTypingStatus(prevTypeData=>{
                typeData={...prevTypeData}
            })
            newMessageData[data["sentId"]].push(data);
            setMessageData(newMessageData);
            chatId && setChatId(chatId);
            setTypingStatus(typeData);
            //calling this emit to say sent user last message was received for double tick as broadcast emit doesnt 
            //support callback 
            socket.emit('LASTMESSAGE',data);
            //calling this for blue tick status to send back if the received used had open the chat container
            chatId=== data.sentId && socket.emit('blueTickStatus',data.sentId,data.toId);
        })
        socket.on("typeStatus",async (data)=>{
            let newMessageData = [];
            let chatId = '';
            let typeData={};
            await setChatId(previousChatId => {
                chatId = previousChatId
            })
            await setMessageData(prevMessageData => {
                newMessageData = { ...prevMessageData }
            })
            await setTypingStatus(prevTypeData=>{
                typeData={...prevTypeData}
            })

            typeData[data["sentId"]]=data.status;
            setMessageData(newMessageData);
            chatId && setChatId(chatId);
            typeData && setTypingStatus(typeData);
        })
        socket.on("LASTMESSAGERECEIVED",async (data)=>{
            let newMessageData = [];
            let chatId = '';
            let typeData={};
            await setChatId(previousChatId => {
                chatId = previousChatId
            })
            await setMessageData(prevMessageData => {
                newMessageData = { ...prevMessageData }
            })
            await setTypingStatus(prevTypeData=>{
                typeData={...prevTypeData}
            })

            newMessageData[chatId].forEach((chatData)=>{
                if(chatData.seenStatus === false){
                    chatData.seenStatus=true;
                }
           })
            await setMessageData(newMessageData);
            chatId && setChatId(chatId);
            setTypingStatus(typeData);
        })
        socket.on("changeBlueTickStatus",async (receivedUserid,sentUserid)=>{
            let newMessageData = [];
            let chatId = '';
            let typeData={};
            await setChatId(previousChatId => {
                chatId = previousChatId
            })
            await setMessageData(prevMessageData => {
                newMessageData = { ...prevMessageData }
            })
            await setTypingStatus(prevTypeData=>{
                typeData={...prevTypeData}
            })

            newMessageData[sentUserid].forEach((chatData)=>{
                if(chatData.seenStatus !== "seen"){
                    chatData.seenStatus="seen";   
                }
           })
            await setMessageData(newMessageData);
            chatId && setChatId(chatId);
            setTypingStatus(typeData);
        })
        return ()=>{
            console.log("disconnect")
            socket.disconnect()
        }
    }, []);


    const openChatContainer = (userId, contactName) => {
        setChatId(userId);
        setContactName(contactName);
        //for blue tick status when user clicks the chat container
        if(messageData[userId].length>0){
            socket.emit('blueTickStatus',userId,userData["_id"]);
        }
    }

    const onSearchEnter = (input) => {
        if (input === "") {
            setSearchResult(contacts);
        } else {
            setSearchResult(contacts.filter((value) => value.indexOf(input) !== -1))
        }
    }

    const setMessage = (selfUserMessage) => {
        const newMessageData = { ...messageData };
        newMessageData[chatId].push(selfUserMessage);
        setMessageData(newMessageData)
    }

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={classes.root}>
            <Header handleDrawerToggle={() => handleDrawerToggle()} />
            <nav className={classes.drawer} aria-label="Conatcts">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <>
                            <Searchinput onSearch={(input) => onSearchEnter(input)} />
                            <Divider />
                            <Contacts contacts={searchContacts} typingStatus={typingStatus} openChatContainer={(userId, contactName) => openChatContainer(userId, contactName)} />
                        </>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <>
                            <Searchinput onSearch={(input) => onSearchEnter(input)} />
                            <Divider />
                            <Contacts contacts={searchContacts} typingStatus={typingStatus} openChatContainer={(userId, contactName) => openChatContainer(userId, contactName)} />
                        </>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={`${classes.content}`}>
                {chatId && chatId !== '' ? <ChatContainer socket={socket} chatData={{ chatId: chatId, contactName: contactName }} 
                setMessage={(selfUserMessage) => setMessage(selfUserMessage)} messageData={messageData[chatId]} /> :
                    <Nomessages message="Open chats to check messages" />}
            </main>
        </div>
    )
}

export default Dashboard;