  
export function getChatUsersList(chat, usersContext) {
    return chat?.userIds.map(user => {
      let fullUser = usersContext.allUsers[user._id] || {};
      return fullUser.userName;
    }).join(', ');
  }