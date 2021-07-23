import React from 'react';
import styled from 'styled-components/macro';
import { getChatUsersList } from './utils';

let Chat = styled.div({
  // border: '1px solid pink',
  borderBottom: '1px solid mediumturquoise',
  padding: '0.5em',
  cursor: 'pointer',
  marginTop: '0.5em',
  color: 'mediumturquoise',
  borderRadius: '5px',
  backgroundColor: 'white '
});
export function Chats(props) {
  return <ul>
    {props.chats.map(chat => {
     return <Chat key={chat._id} onClick={() => props.onSelectChat(chat._id)}>
        {getChatUsersList(chat, props.usersContext)}
      </Chat>
    })}
  </ul>
}