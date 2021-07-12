// import React, { useEffect, useRef, useState } from 'react';
// import { Messages } from './Messages';
// import { Pane, Panes } from './Panes';
// import { Chats } from './Chats';
// import { MessageForm } from './MessageForm';

// const MY_USER_ID = '60bfaf01d6c5f547fc147cca';
// let get = (route) => fetch(`http://localhost:8080/api/${route}`).then(res => res.json())

// export function App() {
//     let [chats, setChats] = useState([]);
//     let [chatId, setChatId] = useState(null);
//     //let [selectedId, setSelectedId] = useState(null);
//     let [messages, setMessages] = useState([]);
//     let [lastPoll, setLastPoll] = useState(Date.now());
//     let [myUser, setMyUser] = useState({});
//     let [friends, setFriends] = useState([]);
//     let [usersContext, setUsersContext] = useState({
//       myUser: {},
//       allUsers: {}
//     });
//     let timer = useRef(null);

//     useEffect(loadMyUser, []);
//     useEffect(loadMyFriends, [myUser?._id]);
//     useEffect(updateUsersContext, [myUser, friends]);
//     useEffect(loadChats, []);
//     // useEffect(loadAllUsers, []);
//     useEffect(loadMessages, [chatId, lastPoll]);
//     // useEffect(startTimer, [lastPoll]);

//     let selectedChat = chats.find((chat) => chat._id === chatId);

//     function loadAllUsers() {
//       // GET request using fetch inside useEffect React hook
//       fetch('http://localhost:8080/api/users')
//           .then((response) => response.json())
//           .then((users) => console.log(users))
//           .catch((err) => console.log("eror" + err));
//     };

//     return <Panes>
//       <Pane width={'35%'} minWidth={'300px'}
//         // header={`All Chats (lastPoll: ${lastPoll})`}
//         header={`User: ${myUser.userName} (${myUser._id}) (lastPoll: ${lastPoll})`}
//         body={<Chats chats={chats} onSelectChat={setChatId}></Chats>}>
//       </Pane>
//       <Pane width={'65%'}
//         // header={`${selectedChat?.users.map(user => user.name).join(', ')} (${selectedChat?.id})`}
//         header={`Chat (${selectedChat?._id}): ${getChatUsersList(selectedChat)}`}
//         body={<Messages messages={messages} usersContext={usersContext}></Messages>}
//         footer={<MessageForm onNewMessage={onNewMessage}></MessageForm>}
//         lastScroll={lastPoll}>
//       </Pane>
//   </Panes>;

//   // function loadMyUser(){
//   //   const USER = '60bfaf01d6c5f547fc147cca';
//   //   fetch(`http://localhost:8080/api/users/${USER}`)
//   //   .then(res => res.json())
//   //   .then(user =>{
//   //     setMyUser(user)
//   //   })
//   // };

//   function getChatUsersList(chat) {
//     return chat?.userIds.map(user => {
//       let fullUser = usersContext.allUsers[user._id] || {};
//       return fullUser.userName;
//     }).join(', ');
//   }

//   function loadMyUser() {
//     get(`users/${MY_USER_ID}`)
//     .then(user => {
//       setMyUser(user);
//     });
//   }
    
//     // function loadMyUser() {
//     //   import('./data/users_me')
//     //     .then(module => {
//     //       let user = module.user;
//     //       setMyUser(user);
//     //     });
//     // }
//     function loadMyFriends() {
//       if (!myUser._id) {
//         return;
//       }
//       get('users')
//         .then(users => {
//           let friends = users.filter(user => user._id !== myUser._id);
//           setFriends(friends);
//         });
//     }

//     function onNewMessage(body) {
//       fetch(`/post/chats/${chatId}/messages`)
//       .then(res => {
//           let newMessage = {
//             chatId,
//             body,
//             user: {name: 'zlil yoffe'},
//           };
//           console.log(`sending: ${JSON.stringify(newMessage)}`);
//           setLastPoll(Date.now());
//         });
//     }

//     function loadChats() {
//       get('chats').then(chats => {
//         setChats(chats);
//         setChatId(chats[0]._id);
//       });
//     }

//     // function loadChats() {
//     //   import('./data/chats.js')
//     //     .then(module => {
//     //       let chats = module.chats;
//     //       setChats(chats);
//     //       setChatId(chats[0].id);
//     //     });
//     // }

//     function loadMessages() {
//       if (!chatId) {
//         return;
//       }
//       get(`chats/${chatId}/messages`)
//         .then((messages) => {
//           setMessages(messages);
//         })
//     }
//     function startTimer() {
//       clearTimeout(timer.current);
//       timer.current = setTimeout(() => {
//         setLastPoll(Date.now());
//       }, 5000);
//     }
//   }

//   function updateUsersContext() {
//     let newUsersContext = {
//       myUser,
//       allUsers: friends.concat(myUser).reduce((map, user) => {
//         map[user._id] = user;
//         return map;
//       }, {})
//     };
//     setUsersContext(newUsersContext);

// //   // function addFakeMessage(messages) {
// //   //   let messageBeforeLast = messages[messages.length - 2];
// //   //   let newMessage = {...messageBeforeLast, id: Date.now()};
// //   //   messages.push(newMessage);
// //   //   return messages;
// //   // }

// //   /*

// //     useEffect(() => {
// //       if (!selectedId) {
// //         return;
// //       }
// //       import(`./data/messages_${selectedId}.js`)
// //         .then((module) => {
// //           let messages = module.messages;
// //           setMessages(addFakeMessage(messages));
// //         })
// //     }, [selectedId, lastPoll]);
// // //       fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedId}`)
// // //       .then(res => res.json())
// // //       .then((comments) => setComments(comments))
// // //   }, [selectedId]);

// // useEffect(() => {
// //     setTimeout(() => {
// //         setLastPoll(Date.now());
// //     }, 6000);
// // }, [lastPoll]);
    
// //   let selectedChat = chats.find((p) => p.id === selectedId);
  
// //     return <Panes>
// //         <Pane width={'35%'} minWidth={'300px'}
// //          header={`All Chats (lastPoll: ${lastPoll})`}
// //          body={<Chats chats={chats} onSelectChat={setSelectedId}></Chats>}>
// //       </Pane>
// //       <Pane width={'65%'}
// //       header={`${selectedChat?.users.map(user => user.name).join(', ')} (${selectedChat?.id})`}
// //       body={<Messages messages={messages}></Messages>}
// //       footer={<form onSubmit={onNewMessage}>
// //           <input id={'newMessage'}></input>
// //       </form>}
// //       lastScroll={lastPoll}>
// //       </Pane>
// //     </Panes>;
// //   }
  
// //   function addFakeMessage(messages) {
// //     let messageBeforeLast = messages[messages.length - 2];
// //     let newMessage = {...messageBeforeLast, id: Date.now()};
// //     messages.push(newMessage);
// //     return messages;
// //   }

// //   useEffect(() => {
// //     import('./data/chats.js')
// //         .then(module => {
// //             let chats = module.chats;
// //             setChats(chats);
// //             setSelectedId(chats[0].id);
// //         });
// //     }, []);

// //     useEffect(() => {
// //       fetch('https://jsonplaceholder.typicode.com/posts')
// //         .then(res => res.json())
// //         .then((posts) => setPosts(posts))
// //     }, [])

