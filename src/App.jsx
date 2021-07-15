import React, { useEffect, useRef, useState } from 'react';
import { Messages } from './Messages';
import { Pane, Panes } from './Panes';
import { Chats } from './Chats';
import { MessageForm } from './MessageForm';
import { getChatUsersList } from './utils';
import { FindUsers } from './FindUsers';
import { get, post } from './utils';


//https://whatsapp-server-zlilyoffe.herokuapp.com
// const MY_USER_ID = '60bfaf01d6c5f547fc147cca';
// let get = (route) => fetch(`http://localhost:8080/api/${route}`, {
//   credentials: 'include',
//   mode: 'cors'
// }).then(res => res.json())

export function App() {
    let [chats, setChats] = useState([]);
    let [chatId, setChatId] = useState(null);
    let [newChatId, setNewChatId] = useState(null);
    let [messages, setMessages] = useState([]);
    let [lastPoll, setLastPoll] = useState(Date.now());
    let [myUser, setMyUser] = useState({});
    let [friends, setFriends] = useState([]);
    let [usersContext, setUsersContext] = useState({
      myUser: {},
      allUsers: {}
    });
    let timer = useRef(null);
    let lastChatId = useRef(null);

    useEffect(loadMyUser, []);
    useEffect(loadMyFriends, [myUser?._id]);
    useEffect(updateUsersContext, [myUser, friends]);
    // useEffect(loadChats, [myUser?._id]);
    // useEffect(loadAllUsers, []);
    useEffect(loadChats, [myUser?._id, newChatId, lastPoll]);
    useEffect(loadMessages, [chatId, lastPoll]);
    useEffect(startTimer, [lastPoll]);
    useEffect(saveLastChatId, [chatId]);

    let selectedChat = chats.find((chat) => chat._id === chatId);
    let lastPollDisplay = (() => {
      let now = new Date(lastPoll);
      return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    })();


    return <Panes>
      <Pane width={'35%'} minWidth={'300px'}
        header={`User: ${myUser.userName} (lastPoll: ${lastPollDisplay})`}
        body={<>
          <FindUsers onFoundUserClick={onFoundUserClick}></FindUsers>
          Chats:
        <Chats chats={chats} onSelectChat={setChatId} usersContext={usersContext}></Chats>
        </>}>
      </Pane>
      <Pane width={'65%'}
        header={`Chat: ${getChatUsersList(selectedChat, usersContext)}`}
        body={<Messages messages={messages} usersContext={usersContext}></Messages>}
        footer={<MessageForm onNewMessage={onNewMessage}></MessageForm>}
        lastScroll={lastPoll}>
      </Pane>
  </Panes>;


  function loadMyUser() {
    get('me')
    .then(user => {
      setMyUser(user);
    });
  }
 
    function loadMyFriends() {
      if (!myUser._id) {
        return;
      }
      get('users')
        .then(users => {
          let friends = users.filter(user => user._id !== myUser._id);
          setFriends(friends);
        });
    }

    function onNewMessage(text) {
      let newMessage = {
        chat: chatId, // TODO rename to chatId
        text,
        date: String(new Date()), // TODO should be timestamp
        picURL: '',
        author: myUser, // TODO should only send userId
      };
      post(`chats/${chatId}/messages`, newMessage)
        .then(res => {
          console.log(`Server responded with: ${JSON.stringify(res)}`);
          setLastPoll(Date.now());
        });
    }

    // function onNewMessage(text) {
    //   fetch(`/post/chats/${chatId}/messages`)
    //   .then(res => {
    //       let newMessage = {
    //         chatId,
    //         text,
    //         user: {name: 'zlil yoffe'},
    //       };
    //       console.log(`sending: ${JSON.stringify(newMessage)}`);
    //       setLastPoll(Date.now());
    //     });
    // }

    function onFoundUserClick(foundUserId) {
      post('chats', {userIds: [myUser._id, foundUserId]})
        .then(newChat => {
          setNewChatId(newChat._id);
        });
    }

    function loadChats() {
      if (!myUser._id) {
        return;
      }
      get(`chats?userid=${myUser._id}`).then(chats => {
        setChats(chats);
        if (!chats.length) {
          return;
        }
        let defaultChat = lastChatId.current || chats[0]._id;
        setChatId(defaultChat)
      });
    }

    function loadMessages() {
      if (!chatId) {
        return;
      }
      get(`chats/${chatId}/messages`)
        .then((messages) => {
          setMessages(messages);
        })
    }
    
    function startTimer() {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setLastPoll(Date.now());
      }, 5000);
    }

    function saveLastChatId() {
      lastChatId.current = chatId;
    }
  

  function updateUsersContext() {
    let newUsersContext = {
      myUser,
      allUsers: friends.concat(myUser).reduce((map, user) => {
        map[user._id] = user;
        return map;
      }, {})
    };
    setUsersContext(newUsersContext)
  }
}
