import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}));

const Searchinput = (props) => {
    const classes = useStyles();

    const onSearch=(event)=>{
        props.onSearch(event.target.value);
    
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(event)=>onSearch(event)}
            />
        </Paper>
    );
}

export default Searchinput;