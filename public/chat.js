// ... existing socket setup ...

btn.addEventListener('click', () => {
    if(message.value === "") return;
    const data = { message: message.value, handle: handle.value };
    socket.emit('send_message', data);
    
    // Add our message to the screen (aligned left like the screenshot)
    output.innerHTML += `<div class="msg me"><strong>ME</strong> ${data.message}</div>`;
    message.value = "";
    // Auto-scroll to bottom
    const win = document.getElementById('chat-window');
    win.scrollTop = win.scrollHeight;
});

socket.on('receive_message', (data) => {
    output.innerHTML += `<div class="msg"><strong>${data.handle.toUpperCase()}</strong> ${data.message}</div>`;
    const win = document.getElementById('chat-window');
    win.scrollTop = win.scrollHeight;
});
