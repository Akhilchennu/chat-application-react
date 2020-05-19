import React from 'react';
import ForumIcon from '@material-ui/icons/Forum';

const Nomessages=(props)=>{
    return(
        <div className="no-chat">
          <span>{`${props.message}..`}</span>
          <ForumIcon />
        </div>
    );
}

export default Nomessages;