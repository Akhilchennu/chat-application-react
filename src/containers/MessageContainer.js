import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';

const MessageContainer = (props) => {

    const { messageData } = props || []

    const userData = useSelector(state => state.userData || {});

    const messageBlock = React.createRef();

    useEffect(()=>{
        debugger
        messageBlock.current.scrollTop = messageBlock.current.scrollHeight
    },[messageData.length])

    return (
        <div className="messageContainer" ref={messageBlock}>
            {messageData.map((displaydata,index) => {
                return userData["_id"] === displaydata["sentId"] && userData["name"] === displaydata["sentName"] ?
                    <div className="container self" key={index}>
                        <p><b>{displaydata["sentName"]}</b></p>
                        {displaydata.htmlData && !displaydata.imageData?<div dangerouslySetInnerHTML={{ __html: displaydata.htmlData }}></div>:
                        <img src={`data:image/jpeg;base64,${displaydata.imageData}`} className="receivedImg" width="200" height="200" alt="base64 test"></img>}
                        <p className="time-right">{displaydata.time}</p>
                    </div> :
                    <div className="container darker other" key="index">
                        <p><b>{displaydata["sentName"]}</b></p>
                        {displaydata.htmlData && !displaydata.imageData?<div dangerouslySetInnerHTML={{ __html: displaydata.htmlData }}></div>:
                        <img src={`data:image/jpeg;base64,${displaydata.imageData}`} className="receivedImg" width="200" height="200" alt="base64 test"></img>}
                        <p className="time-left">{displaydata.time}</p>
                    </div>
            })}
        </div>

    );
}

export default MessageContainer;