const chatBox = document.querySelector('#chatContainer');
const chatInput = document.querySelector('#submitAdvice');

async function sendChatRequest() {

    const chatMessage = document.createElement('div');
    chatMessage.classList.add('ask');
    chatMessage.innerHTML = `${chatInput.value}`;
    chatBox.appendChild(chatMessage);

    // 값을 저장해 놓고 입력 창을 비웁니다.
    const savedInputValue = chatInput.value;
    chatInput.value = '';

    try {
        const response = await fetch('https://tune-your-day-openai.netlify.app/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMessage: savedInputValue
            })
        });

        if (!response.ok){
            throw new Error(response.statusText);
        }

        const data = await response.json();

        console.log('data', data);

        const chatMessage = document.createElement('div');
        chatMessage.classList.add('answer');
        chatMessage.innerHTML = `${data.assistant}`;
        chatBox.appendChild(chatMessage);

    } catch (e) {
        console.log(e);
    }
}

chatInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
        sendChatRequest();
    }
});