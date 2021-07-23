import React, { useState } from 'react';
// import styled from 'styled-components/macro';
import { get } from './utils';

export function FindUsers({onFoundUserClick}) {
  let [foundUsers, setFoundUsers] = useState([]);

  return <div style={{marginBottom: '2em', borderBottom: '1px solid mediumturquoise', color: 'mediumturquoise',

  borderRadius: '5px', marginTop: '1em',
}}>
  <input onChange={(e) => {
    get(`users?search=${e.target.value}`)
      .then(users => {
        setFoundUsers(users);
      })
  }}></input>
  <div>
    results: {foundUsers.map(u => <button key={u._id} data-user-id={u._id} onClick={(e) => {
      onFoundUserClick(e.target.dataset.userId);
    }}>
      {u.userName}
      </button>)}
  </div>
</div>;
} 