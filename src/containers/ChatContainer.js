import React from 'react';
import Nomessages from '../components/Nomessages';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MessageContainer from './MessageContainer';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        bottom: '24px',
        width: '60%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}));

const ChatContainer=(props)=>{
    const classes = useStyles();
    return(
        <div className="chatContainer">
        {['sfs'].length>0?<MessageContainer/>:<Nomessages message="send messages now" />}
        <div className={`${classes.root}`}>
                <TextField
                    multiline
                    rows={4}
                    placeholder="Type message.."
                    variant="outlined"
                    fullWidth
                    inputProps={{
                        style: {
                          height:'20px'
                        }
                    }}
                />
            </div>
        </div>    
    )
}

export default ChatContainer;