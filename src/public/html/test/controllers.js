let idFromSocket = null;
const get = (id) => document.querySelector(`#${id}`);

const id = get('id');
const name = get('name');
const ready = get('ready');
const admin = get('admin');
const word = get('word');
const stage = get('stage');
const players = get('players');
const nameInput = get('name_input');
const nameButton = get('name_button');
const answerInput = get('answer_input');
const answerButton = get('answer_button');
const readyButton = get('ready_button');
const unreadyButton = get('unready_button');
const pingButton = get('ping_button');
const startButton = get('start_button');
const last = get('last');

const setLast = (message) => {
  last.innerText = JSON.stringify(message.payload);
}

const setId = (message) => {
  if (message.type === 'auth_welcome-success') {
    idFromSocket = message.payload.id;
    id.innerText = `id: ${message.payload.id}`;
  }
}

const setName = (message) => {
  if (message.type === 'player_name-success') {
    tname.innerText = `name: ${message.payload.name}`;
  }
}

const setReady = (message) => {
  if (message.type === 'player_ready-success') {
    ready.innerText = `ready: ${message.payload.ready}`;
  }
}

const setStage = (message) => {
  if (message.type === 'game_start-success') {
    stage.innerText = 'GAME';
  } else if (message.type === 'game_over') {
    stage.innerText = `GAME_OVER | WINNER: ${message.payload.winner}, ${message.payload.name}`
  }
}

const setPlayersInformations = (message) => {
  const container = document.createElement('div');
  if (message.type === 'players_information') {
    players.innerHTML = '';
    message.payload.information.forEach(inf => {
      const sub = document.createElement('div');
      const subText = `name: ${inf.name} | active: ${inf.active} | ready: ${inf.ready} | isAdmin: ${inf.isAdmin} | active: ${inf.active}`;
      sub.innerText = subText;
      container.innerHTML = sub;
      if (inf.id === idFromSocket && inf.isAdmin) {
        admin.innerText = 'IS ADMIN: TAK';
      } else {
        admin.innerText = 'IS ADMIN: NO';
      }
      players.appendChild(sub);
    });
  }
}

const socket = new Socket([
  setLast,
  setId,
  setName,
  setReady,
  setStage,
  setPlayersInformations
]);

const processImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    const rawData = e.target.result.split("data:image/png;base64,")[1];
    socket.sendAnswer(rawData);
  });
  reader.readAsDataURL(file);
}

readyButton.addEventListener('click', () => socket.sendReady(true));
unreadyButton.addEventListener('click', () => socket.sendReady(false));
nameButton.addEventListener('click', () => socket.sendName(nameInput.value));
answerInput.addEventListener('change', processImage, false);
