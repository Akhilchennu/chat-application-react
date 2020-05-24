import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector  } from 'react-redux';
import {service} from '../services/service';
import { useDispatch  } from "react-redux";
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const Header = (props) => {
    
    const dispatch = useDispatch();

    const classes = useStyles();

    const userData = useSelector(state => state.userData || {});

    const handleDrawerToggle = () => {
        const {handleDrawerToggle}=props;
        handleDrawerToggle();
    };

    const logOut=()=>{
        const dataResponce = service.logoutAPI();
        dataResponce.then(async (response) => {
            if (response.success) {
                await dispatch({
                    type: "AUTHENTICATE",
                    login:false
                })
                await dispatch({
                    type:'USERDATA',
                    userData:{}
                })
                await dispatch({
                    type:'ALLUSERDATA',
                    allUsers:[]
                })
                props.history.push('/login');
            }
        })
    }
   const {name}=userData;
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className="username">
                    {name}
          </Typography>
                <Tooltip title="Sign out" aria-label="Sign out">
                    <ExitToAppIcon className="signout" onClick={()=>logOut()}/>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);