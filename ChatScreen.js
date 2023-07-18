import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SMSList from './SMSList';

const ChatScreen = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    startSMSList();
  }, []);

  const startSMSList = () => {
    SMSList.start(handleIncomingSMS);
  };

  const handleIncomingSMS = (message) => {
    const { originatingAddress, body } = message;
    const newChat = {
      id: Date.now(),
      sender: originatingAddress,
      message: body,
      unread: 1,
    };
    setChats((prevChats) => [newChat, ...prevChats]);
  };

  const renderChatItem = (chat) => {
    return (
      <View key={chat.id} style={styles.chatItem}>
        <Text style={styles.sender}>{chat.sender}</Text>
        <Text style={styles.message}>{chat.message}</Text>
        {chat.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{chat.unread}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.startTimeText}>Received SMS Messages:</Text>
      <View style={styles.chatList}>
        {chats.map((chat) => renderChatItem(chat))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  startTimeText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  chatList: {
    flex: 1,
    padding: 20,
  },
  chatItem: {
    marginBottom: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    padding: 15,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
  },
  unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 5,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
