import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      setIsLoggedIn(true);
      alert(`Usuário ${username} logado com sucesso!`);
      // Após o login, mostramos a tela do chat depois de 2 segundos (simulando uma transição)
      setTimeout(() => {
        setShowChat(true);
        receiveMessage('Bem-vindo ao chat!');
      }, 2000);
    } else {
      alert('Por favor, insira um nome de usuário.');
    }
  };

  const receiveMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'received' }]);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        showChat ? (
          <ChatScreen
            username={username}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
          />
        ) : (
          <h1>Carregando o chat...</h1>
        )
      ) : (
        <div>
          <h2>Por favor, faça login</h2>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

const ChatScreen = ({ username, messages, newMessage, setNewMessage, sendMessage }) => {
  return (
    <div>
      <h1>Bem-vindo ao chat, {username}!</h1>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'received' ? 'received' : 'sent'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Digite sua mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default App;