import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

function Login(props) {

    const handleSubmit=()=>{
       props.history.push('./dashboard');
    }
    return (
        <div style={{ height: '100%' }}>
            <div className="App-header">
                <Paper className="paperWidth">
                    <div style={{ padding: '4%', paddingBottom: '10%', textAlign: 'center' }}>
                        <div className="header">Login</div>
                        <br />
                        <Divider />
                        <TextField
                            id="email"
                            label="Email"
                            type="text"
                            fullWidth
                            required
                            autoFocus
                            className="marginTop24"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                            required
                            className="marginTop24"
                        />
                        <Button
                            variant="contained" color="primary"
                            className="marginTop24"
                            onClick={()=>{handleSubmit()}}>
                            LogIn
                        </Button>
                        <div className="marginTop12 font"><span>Haven't register yet?</span><a href="#">Register now</a></div>
                    </div>
                </Paper></div></div >
    );
}

export default Login;