import React from 'react';
import styled from 'styled-components/macro';

let Chat = styled.div({
  border: '1px solid',
  borderBottom: '1px solid',
  padding: '0.5em',
  cursor: 'pointer',
});
export function Chats(props) {
  return <ul>
    {props.chats.map(chat => {
     return <Chat key={chat._id} onClick={() => props.onSelectChat(chat._id)}>
        ({chat._id})
      </Chat>
    })}
  </ul>
}