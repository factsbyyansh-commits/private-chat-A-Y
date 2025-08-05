// 1. Socket connection establish karo
const socket = io();

// 2. Username input leke join karo
const username = prompt('Enter your name:');
socket.emit('join', username);

// 3. Send button ka functionality
document.getElementById('sendButton').addEventListener('click', () => {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (message) {
        socket.emit('sendMessage', message);
        input.value = '';
    }
});

// 4. Messages receive karo aur display karo
socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p><strong>${data.user}:</strong> ${data.text}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// 5. Enter key press pe bhi message send ho
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('sendButton').click();
    }
});