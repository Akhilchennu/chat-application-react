import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import {service} from '../services/service';
import { useDispatch  } from "react-redux";

const Login=(props)=> {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [errorMessage,setErrorMessage]=useState();


    const changeUserEmail = (event) => {
        setUserEmail(event.target.value);
        setEmailError();
        setErrorMessage();
    }
    const validateEmail = () => {
        if (userEmail === '' || !userEmail) {
            setEmailError('please enter email address');
        } else {
            const validEmail = validator.isEmail(userEmail);
            if (!validEmail) {
                setEmailError('enter valid email address');
            }
        }
    }

    const changeUserPassword = (event) => {
        setUserPassword(event.target.value);
        setPasswordError();
        setErrorMessage();
    }

    const validateUserPassword = () => {
        if (userPassword === '' || !userPassword) {
            setPasswordError('please enter password');
        } else {
            if(userPassword.length<8){
                setPasswordError('min length of password is 8');
            }
        }
    }
    
    const handleSubmit=(event)=>{
       event.preventDefault();
        if(!userEmail && !userPassword){
            setPasswordError('please enter password');
            setEmailError('please enter email address');
        }else if(userEmail && !userPassword){
            setPasswordError('please enter password');
        }else if(!userEmail && userPassword){
            setEmailError('please enter email address');
        }else if(userEmail && userPassword && !emailError && !passwordError){
            const dataResponce = service.loginAPI(userEmail, userPassword);
            dataResponce.then(async (response) => {
                if (response.success) {
                    await dispatch({
                        type: "AUTHENTICATE",
                        login:true
                    })
                    await dispatch({ type: "USERDATA",
              userData:response["userData"] });
                    props.history.push('/dashboard');
                    setErrorMessage();
                } else {
                    setErrorMessage(response.message || 'Please try again later');
                }
            })
        }
    }

    const fieldKeyPress = (event) =>{
        if(event.key === "Enter"){
            event.preventDefault();
            handleSubmit(event);
        }
     }

    return (
        <div style={{ height: '100%' }}>
            <div className="App-header">
                <Paper className="paperStyle">
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
                            className="marginTop24"
                            autoComplete="off"
                            onChange={(event) => { changeUserEmail(event) }}
                            onBlur={() => validateEmail()}
                            onKeyPress={(event)=>fieldKeyPress(event)}
                            helperText={emailError}
                            value={userEmail}
                            error={emailError ? true : false}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            className="marginTop24"
                            autoComplete="off"
                            value={userPassword}
                            onChange={(event) => { changeUserPassword(event) }}
                            onBlur={() => validateUserPassword()}
                            onKeyPress={(event)=>fieldKeyPress(event)}
                            helperText={passwordError}
                            error={passwordError ? true : false}
                        />
                        {errorMessage?<div className="marginTop24 font"><b>{errorMessage}</b></div>:null}
                        <Button
                            variant="contained" color="primary"
                            className="marginTop24"
                            onClick={(event)=>{handleSubmit(event)}}
                            onKeyPress={(event)=>fieldKeyPress(event)}>
                            LogIn
                        </Button>
                        <div className="marginTop12 font"><span>Haven't register yet?</span><a href="/signup">Register now</a></div>
                    </div>
                </Paper></div></div >
    );
}

export default Login;