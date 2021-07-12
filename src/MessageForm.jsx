import React from 'react';

export function MessageForm({onNewMessage}) {
  return <form onSubmit={onSubmit}>
    <input id={'newMessage'}></input>
  </form>;

  function onSubmit(e) {
    e.preventDefault();
    onNewMessage(e.target.newMessage.value);
  }
}

// let form = styled.div({
//   backgroundColor: 'lavenderblush '
// });