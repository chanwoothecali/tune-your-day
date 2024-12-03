const chatBox = document.querySelector('.chat-box');
const chatInput = document.querySelector('.chat-input');

// const loadingSpinner = document.querySelector('.loading-spinner');
const sendMessage = async () => {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('ask');
    chatMessage.innerHTML = `${chatInput.value}`;
    chatBox.appendChild(chatMessage);

    // 값을 저장해 놓고 입력 창을 비웁니다.
    const savedInputValue = chatInput.value;
    chatInput.value = '';

    // 로딩 스피너 동적으로 추가
    // chatBox.appendChild(loadingSpinner);
    // loadingSpinner.style.display = 'flex';

    // 스크롤을 아래로 이동
    // chatBox.scrollTop = chatBox.scrollHeight;

    const response = await fetch('https://tune-your-day-openai.netlify.app/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // dateTimeString: dateTimeString,
            // selectZodiacString: selectZodiacString,
            userMessage: savedInputValue
        })
    });

    // 로딩 스피너 제거
    // chatBox.removeChild(loadingSpinner);

    const data = await response.json();

    const astrologerMessage = document.createElement('div');
    astrologerMessage.classList.add('answer');
    astrologerMessage.innerHTML = `${data.assistant}`;
    chatBox.appendChild(astrologerMessage);

    // 스크롤을 아래로 이동
    // chatBox.scrollTop = chatBox.scrollHeight;
};


// Send 버튼을 클릭했을 때
document.querySelector('#chat-submit').addEventListener('click', sendMessage);

// 키보드의 엔터키를 눌렀을 때
chatInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
        sendMessage();
    }
});