import React,{useEffect} from 'react';
import {service} from '../services/service';
import { useDispatch  } from "react-redux";

const HomePage=(props)=>{
    const dispatch = useDispatch();
    useEffect(() => {
      const dataResponce = service.getAuth();
      dataResponce.then(async (response) => {
          if (response.success) {
             await dispatch({ type: "USERDATA",
              userData:response["userData"] });
              await dispatch({
                  type: "AUTHENTICATE",
                  login:true
              })
              props.history.push('/dashboard')
          } else {
              props.history.push('/login')
          }
      })
    },[]);
return(
    <div></div>
)
}

export default HomePage;