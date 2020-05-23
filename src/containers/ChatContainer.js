import React, { useState } from 'react';
import Nomessages from '../components/Nomessages';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MessageContainer from './MessageContainer';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        bottom: '0px',
        width: '90%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    inputfile: {
        display: 'none',
    }
}));


const ChatContainer = (props) => {
    const classes = useStyles();
    const userData = useSelector(state => state.userData || {});
    const textInput = React.createRef();
    const { socket, setMessage, messageData, chatData } = props;

    const onSendClick = () => {
        if (textInput.current.innerHTML.toString().trim().length > 0 && textInput.current.innerText.trim().length > 0) {
            const timeNow = new Date();
            const HtmlObject = {
                toId: chatData.chatId,
                sentId: userData["_id"],
                sentName: userData["name"],
                toName: chatData.contactName,
                htmlData: textInput.current.innerHTML.toString().trim(),
                time: `${timeNow.getHours()}:${timeNow.getMinutes()} `,
                seenStatus:false
            };
            const UserData={
                toId: chatData.chatId,
                sentId: userData["_id"],status:false
            }
            socket.emit('sendMessage', HtmlObject);
            socket.emit('sendTypeStatus',UserData)
            setMessage(HtmlObject);
            textInput.current.innerHTML = ''
            textInput.current.focus();

        }
    }

    const onEnter = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSendClick();
        }
    }

    const onImageClick = (event) => {
        if (event.target.files && event.target.files[0]) {
            if (parseInt(event.target.files[0].size / 1024 / 1024) < 6) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    const timeNow = new Date();
                    const HtmlObject = {
                        toId: chatData.chatId, sentId: userData["_id"],
                        sentName: userData["name"],
                        toName: chatData.contactName,
                        imageData: btoa(evt.target.result),
                        time: `${timeNow.getHours()}:${timeNow.getMinutes()} `,
                        seenStatus:false
                    };
                    const UserData={
                        toId: chatData.chatId,
                        sentId: userData["_id"],status:false
                    }
                    socket.emit('sendMessage', HtmlObject);
                    socket.emit('sendTypeStatus',UserData)
                    setMessage(HtmlObject);
                };
                reader.readAsBinaryString(event.target.files[0])
                event.target.value = '';
            } else {
                alert("Please upload image of size less than 6mb")
                event.target.value = '';
            }
        }
    }

    const onEditorInput = (event) => {
        if (textInput.current.innerHTML.toString().trim().length === 1) {
            const UserData={
                toId: chatData.chatId,
                sentId: userData["_id"],status:true
            }
            socket.emit('sendTypeStatus',UserData)
        } else if (textInput.current.innerHTML.toString().trim().length === 0) {
            const UserData={
                toId: chatData.chatId,
                sentId: userData["_id"],status:false
            }
            socket.emit('typeStatus',UserData)
        }
    }

    return (
        <div className="chatContainer">
            {messageData.length > 0 ? <MessageContainer messageData={messageData} /> : <Nomessages message="send messages now" />}
            <div className={`${classes.root}`}>
                <div className="textarea" id="textField" ref={textInput} contentEditable="true" onInput={(event) => { onEditorInput(event) }} data-placeholder="Type message.." onKeyDown={(event) => onEnter(event)}></div>
                <input accept="image/*" className={classes.inputfile} id="icon-button-file" type="file" onChange={(event) => onImageClick(event)} />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" title="upload picture" component="span">
                        <ImageIcon />
                    </IconButton>
                </label>
                <IconButton color="primary" aria-label="send message" title="send message" component="span" onClick={() => onSendClick()}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default ChatContainer;