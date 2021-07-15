  
export function getChatUsersList(chat, usersContext) {
    return chat?.userIds.map(userId => {
      let fullUser = usersContext.allUsers[userId] || {};
      return fullUser.userName;
    }).join(', ');
  }

  export let get = (route) => fetch(`http://localhost:8080/api/${route}`, {
      credentials: 'include',
      mode: 'cors',
  }).then(res => res.json())

  export let post = (route, body) => fetch(`http://localhost:8080/api/${route}`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  });