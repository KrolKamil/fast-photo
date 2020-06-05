class Socket {
  constructor(subscribers) {
    this.subscribers = subscribers;
    this.socket = new WebSocket('ws://localhost:3000');;
    this.id = null;
    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('message', this.handleMessage);
  }

  subscribe = (subscriber) => this.subscribers.push(subscriber);
  send = (message) => this.socket.send(JSON.stringify(message));

  handleOpen = () => {
    this.send({
      type: 'auth_welcome',
      payload: {}
    });
  }

  handleMessage = async (message) => {
    const parsedMessage = await JSON.parse(message.data);
    if (parsedMessage.type === 'auth_welcome-success') {
      this.id = parsedMessage.id;
    }
    for (const subscriber of this.subscribers) {
      subscriber(parsedMessage);
    }
  }

  sendName = (name) => this.send({
    type: 'player_name',
    payload: {
      id: this.id,
      name
    }
  });

  sendReady = (ready) => this.send({
    type: 'player_ready',
    payload: {
      id: this.id,
      ready
    }
  })

  sendAnswer = (answer) => this.send({
    type: 'player_answer',
    payload: {
      id: this.id,
      answer
    }
  });

  sendPing = () => this.send({
    type: 'player_ping',
    payload: {
      id: this.id
    }
  })

  sendStart = () => this.send({
    type: 'game_start',
    payload: {
      id: this.id
    }
  })
}



// const nameInput = document.querySelector('#name');
// const nameButton = document.querySelector('#name_send');
// const currentPlayersInfo = document.querySelector('#players_info');

// let id = null;

// nameButton.addEventListener('click', (e) => {
//   socket.send(JSON.stringify({
//     type: 'player_name',
//     payload: {
//       id,
//       name: nameInput.value
//     }
//   }))
// })

// document.querySelector('#start').addEventListener('click', (e) => {
//   socket.send(JSON.stringify({
//     type: 'game_start',
//     payload: {
//       id
//     }
//   }))
// })

// const socket = new WebSocket('ws://localhost:3000');

// const processImage = (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.addEventListener('load', (e) => {
//     const rawData = e.target.result.split("data:image/png;base64,")[1];
//     socket.send(JSON.stringify({
//       type: 'player_answer',
//       payload: {
//         answer: rawData,
//         id
//       }
//     }));
//   });
//   reader.readAsDataURL(file);
// }

// document.getElementById("myFile").addEventListener("change", processImage, false);


// socket.addEventListener('open', (e) => {
//   socket.send(JSON.stringify({
//     type: 'auth_welcome',
//     payload: {}
//   }));
// });
// socket.addEventListener('message', async (message) => {
//   const div = document.createElement('div');
//   div.innerText = message.data;
//   document.body.appendChild(div);
//   const parsedMessage = await JSON.parse(message.data);
//   if (parsedMessage.type === 'players_information') {
//     const infoSize = parsedMessage.payload.information.length;
//     currentPlayersInfo.innerText = infoSize;
//   }
//   if (parsedMessage.type === 'auth_welcome-success') {
//     id = parsedMessage.payload.id;
//     setTimeout(() => {
//       socket.send(JSON.stringify({
//         type: 'player_ready',
//         payload: {
//           id: parsedMessage.payload.id,
//           ready: true
//         }
//       }))
//     }, 1000);
//     socket.send(JSON.stringify({
//       type: 'player_ready',
//       payload: {
//         id: parsedMessage.payload.id,
//         ready: true
//       }
//     }));
//   }
// })