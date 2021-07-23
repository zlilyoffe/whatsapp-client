import React from 'react';
import styled from 'styled-components/macro';

let Message = styled.div({
        border: '1px solid',
        padding: '0.5em',
        marginTop: '1em',
        marginRight: '2em',
        marginLeft: '1em',
        color: 'white',
        borderRadius: '10px',
        backgroundColor: 'mediumturquoise ',
        
});

let MessagesContainer = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

export function Messages(props) {
  if (!props.messages) {
    return '';
  }
  return <MessagesContainer>
          {props.messages.map(message => {
            let fullUser = props.usersContext.allUsers[message.author._id] || {};
            if (message.author._id === props.usersContext.myUser._id){
            return <Message style={{alignSelf: 'flex-end'}} key={message._id}>
                  <p>{fullUser.userName}: {message.text}</p>
            </Message>;
            } else {
              return <Message style={{alignSelf: 'flex-start'}} key={message._id}>
              <p>{fullUser.userName}: {message.text}</p>
        </Message>;
            }
          })}
          </MessagesContainer>
}

// return <ul>
// {props.messages.map(message => {
//   let fullUser = props.usersContext.allUsers[message.author._id] || {};
//   return <Message key={message._id}>
//     <p>chatId: {message.chat}</p>
//     <p>messageId: {message._id}</p>
//     <p>user: {fullUser.userName}</p>
//     <p>{message.text}</p>
//   </Message>;
// })}
// </ul>;
// }