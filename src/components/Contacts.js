import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Contacts = (props) => {

    const handleContactCLick=(chatid)=>{
        props.openChatContainer("chatid");
    }
    return (
        <div>
            <List>
                {['Abishek', 'Akhil', 'Hari', 'Bot', 'Abishek', 'Akhil', 'Hari', 'Bot', 'Abishek', 'Akhil', 'Hari', 'Bot', 'Abishek', 'Akhil', 'Hari', 'Bot', 'Abishek', 'Akhil', 'Hari', 'Bot', 'Abishek', 'Akhil', 'Hari', 'Bot'].map((text, index) => (
                    <ListItem button key={index} onClick={()=>handleContactCLick("chatId")}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Contacts;