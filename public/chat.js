const socket = io();

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');

btn.addEventListener('click', () => {
    const data = { message: message.value, handle: handle.value };
    socket.emit('send_message', data);
    
    // Add our own message to the screen
    output.innerHTML += `<div class="msg me"><strong>You:</strong> ${data.message}</div>`;
    message.value = "";
});

socket.on('receive_message', (data) => {
    output.innerHTML += `<div class="msg"><strong>${data.handle}:</strong> ${data.message}</div>`;
});
