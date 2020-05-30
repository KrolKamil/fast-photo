let id = '';
const socket = new WebSocket('ws://localhost:3000');
const subscribers = [];
const subscribe = (subscriber) => subscribers.push(subscriber)

socket.addEventListener('message', async (message) => {
  const parsedMessage = JSON.parse(message);
  if(parsedMessage.type === 'auth_welcome-success'){
    id = parsedMessage.payload.id;
  }
  subscribers.forEach((subscriber) => subscriber(parsedMessage));
});

const send = (message) => socket.send(JSON.stringify(message));

const sendAuthWelcome = () => send({
  type: 'auth_welcome',
  payload: {}
})

const sendPlayerReady = (ready) => send({
  type: 'player_ready',
  payload: {
    id: id,
    ready: ready
  }
});

const sendGameStart = () => send({
  type: 'game_start',
  payload: {
    id
  }
});

const processImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    const rawData = e.target.result.split('data:image/png;base64,')[1];
    send({
        type: 'player_answer',
        payload: {
          answer: rawData,
          id
        }
      });
  });
  reader.readAsDataURL(file);
};

document
  .getElementById('myFile')
  .addEventListener('change', processImage, false);