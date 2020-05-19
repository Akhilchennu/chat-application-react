import React from 'react';


const MessageContainer = (props) => {

    return (
        <div className="messageContainer">
            <div className="container self">
                <p>Akhil</p>
                <p>Hello. How are you today?</p>
                <span class="time-right">11:00</span>
            </div>
            <div class="container darker other">
                    <p>Abhi</p>
                    <p>Hey! I'm fine. Thanks for asking!</p>
                    <span class="time-left">11:01</span>
            </div>

            </div>
    );
}

export default MessageContainer;