// import React, { useEffect, useRef, useState } from 'react';
// import { Messages } from './Messages';
// import { Pane, Panes } from './Panes';
// import { Chats } from './Chats';
// import { MessageForm } from './MessageForm';

// const MY_USER_ID = '60bddb8019094d60c42557cf';
// let get = (route) => fetch(`http://localhost:8080/api/${route}`).then(res => res.json())

// export function App() {
//   let [chats, setChats] = useState([]);
//   let [chatId, setChatId] = useState(null);
//   let [messages, setMessages] = useState([]);
//   let [lastPoll, setLastPoll] = useState(Date.now());
//   let [myUser, setMyUser] = useState({});
//   let [friends, setFriends] = useState([]);
//   let [usersContext, setUsersContext] = useState({
//     myUser: {},
//     allUsers: {}
//   });
//   let timer = useRef(null);

//   useEffect(loadMyUser, []);
//   useEffect(loadMyFriends, [myUser?._id]);
//   useEffect(updateUsersContext, [myUser, friends]);
//   useEffect(loadChats, []);
//   useEffect(loadMessages, [chatId, lastPoll]);
//   // useEffect(startTimer, [lastPoll]);

//   let selectedChat = chats.find((chat) => chat._id === chatId);

//   return <Panes>
//     <Pane width={'35%'} minWidth={'300px'}
//       header={`User: ${myUser.userName} (${myUser._id}) (lastPoll: ${lastPoll})`}
//       body={<Chats chats={chats} onSelectChat={setChatId}></Chats>}>
//     </Pane>
//     <Pane width={'65%'}
//       header={`Chat (${selectedChat?._id}): ${getChatUsersList(selectedChat)}`}
//       body={<Messages messages={messages} usersContext={usersContext}></Messages>}
//       footer={<MessageForm onNewMessage={onNewMessage}></MessageForm>}
//       lastScroll={lastPoll}>
//     </Pane>
//   </Panes>;

//   function getChatUsersList(chat) {
//     return chat?.userIds.map(user => {
//       let fullUser = usersContext.allUsers[user._id] || {};
//       return fullUser.userName;
//     }).join(', ');
//   }

//   function loadMyUser() {
//     get(`users/${MY_USER_ID}`)
//       .then(user => {
//         setMyUser(user);
//       });
//   }

//   function loadMyFriends() {
//     if (!myUser._id) {
//       return;
//     }
//     get('users')
//       .then(users => {
//         let friends = users.filter(user => user._id !== myUser._id);
//         setFriends(friends);
//       });
//   }

//   function onNewMessage(body) {
//     fetch(`/post/chats/${chatId}/messages`)
//       .then(res => {
//         let newMessage = {
//           chatId,
//           body,
//           user: {name: 'Serge Krul'},
//         };
//         console.log(`Sending to the server: ${JSON.stringify(newMessage)}`);
//         setLastPoll(Date.now());
//       });
//   }

//   function loadChats() {
//     get('chats').then(chats => {
//       setChats(chats);
//       setChatId(chats[0]._id);
//     });
//   }

//   function loadMessages() {
//     if (!chatId) {
//       return;
//     }
//     get(`chats/${chatId}/messages`)
//       .then((messages) => {
//         setMessages(messages);
//       })
//   }
//   function startTimer() {
//     clearTimeout(timer.current);
//     timer.current = setTimeout(() => {
//       setLastPoll(Date.now());
//     }, 5000);
//   }

//   function updateUsersContext() {
//     let newUsersContext = {
//       myUser,
//       allUsers: friends.concat(myUser).reduce((map, user) => {
//         map[user._id] = user;
//         return map;
//       }, {})
//     };
//     setUsersContext(newUsersContext)
//   }
// }