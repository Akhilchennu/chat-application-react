import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Contacts = (props) => {

    const handleContactCLick=(user)=>{
        props.openChatContainer(user["_id"],user["name"]);
    }
    
    const {contacts} =props || []
    const {typingStatus}=props
    
    return (
        <div>
            <List>
                {contacts.map((user, index) => (
                    <ListItem button key={user["_id"]} onClick={()=>handleContactCLick(user)}>
                        <ListItemText primary={user["name"]} secondary={typingStatus && typingStatus[user["_id"]] ?"typing..":undefined}/>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Contacts;