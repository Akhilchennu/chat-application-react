import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Contacts from '../components/Contacts.js';
import Searchinput from '../components/Searchinput';
import Header from '../components/Header';
import Nomessages from '../components/Nomessages';
import ChatContainer from './ChatContainer';

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
        paddingRight:0
    },
}));

function Dashboard(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [chatId, setChatId] = useState('');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const openChatContainer = (chatid) => {
        setChatId(chatid)
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
                            <Searchinput />
                            <Divider />
                            <Contacts openChatContainer={(chatid) => openChatContainer(chatid)} />
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
                            <Searchinput />
                            <Divider />
                            <Contacts openChatContainer={(chatid) => openChatContainer(chatid)} />
                        </>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={`${classes.content}`}>
                {chatId && chatId !== '' ? <ChatContainer chatId={chatId} /> :
                    <Nomessages message="Open chats to check messages" />}
            </main>
        </div>
    )
}

export default Dashboard;