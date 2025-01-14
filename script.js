const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatContent = document.getElementById('chat-content');
const newChatButton = document.getElementById('new-chat-button');
const chatSelector = document.getElementById('chat-selector');

let chatHistory = {};
let currentChatId = null;

newChatButton.addEventListener('click', createNewChat);
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function createNewChat() {
  const chatId = `chat-${Date.now()}`;
  chatHistory[chatId] = [];
  currentChatId = chatId;

  const option = document.createElement('option');
  option.value = chatId;
  option.textContent = `Chat ${Object.keys(chatHistory).length}`;
  chatSelector.appendChild(option);
  chatSelector.value = chatId;

  chatContent.innerHTML = '';
}

chatSelector.addEventListener('change', function() {
  currentChatId = chatSelector.value;
  loadChatHistory(currentChatId);
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '' || !currentChatId) return;
  
  // Ajouter le message de l'utilisateur à l'historique
  addMessageToChat('Vous', message);
  chatHistory[currentChatId].push({ sender: 'Vous', text: message });
  userInput.value = '';

  // Envoyer le message au serveur backend
  const response = await fetch('http://localhost:3000/messageIA/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message, chatId: currentChatId, history: chatHistory[currentChatId] })
  });

  const data = await response.json();
  addMessageToChat('Hélio', data.response);
  chatHistory[currentChatId].push({ sender: 'Hélio', text: data.response });
}

// function addMessageToChat(sender, text) {
//   const messageElement = document.createElement('div');
//   messageElement.classList.add('message');
//   messageElement.innerHTML = `<strong>${sender}: </strong>${text}`;
//   chatContent.appendChild(messageElement);
//   chatContent.scrollTop = chatContent.scrollHeight;
// }

function addMessageToChat(sender, text) {
    // Échapper les caractères HTML pour éviter les attaques XSS
    const escapedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Convertir les éléments Markdown en HTML
    const formattedText = escapedText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convertir **texte** en <strong>texte</strong>
        .replace(/_(.*?)_/g, '<em>$1</em>') // Convertir _texte_ en <em>texte</em>
        .replace(/`(.*?)`/g, '<code>$1</code>') // Convertir `texte` en <code>texte</code>
        .replace(/\n/g, '<br>') // Convertir les sauts de ligne en <br> pour l'affichage HTML
        .replace(/●/g, '&#8226;') // Convertir le caractère spécial ● en HTML

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}: </strong>${formattedText}`;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function loadChatHistory(chatId) {
  chatContent.innerHTML = '';
  chatHistory[chatId].forEach(({ sender, text }) => {
    addMessageToChat(sender, text);
  });
}
