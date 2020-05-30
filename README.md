# Fast Photo
Game server for image recognation.(University project)
## Description
Game has three stages.
#### 1. Waiting for players:
When at least two players register for the game and all of them set status to ready first stage ends and the game begin.
Available players actions:
    * Registration to participate in game(max 4 players)
    * Changing status to ready/unready
#### 2. Game:
Players receive information about what object they have to take a photo to win the game.
    Available players actions:
    * Sending image to server to try win the game.
#### 3. Game Over.
When player sent correct photo(photo contains object from stage 2) the game ends.
Server sends winner information to all players.
    
# HTTP API

### Reset socket
Restart web socket(usefeull if you lose player id)
(does not restert AWS keys)
```http
GET /reset/socket
```

### Reset server
Restart whole server - socket and AWS keys
```http
GET /reset/all
```

### Load
Server require AWS credentials in order to work.
This endpoint allows to load those.
Request MUST be JSON type
```http
POST /load
{
    "aws_access_key_id": "string",
    "aws_secret_access_key": "string",
    "aws_session_token": "string"
}
```
Example:

```
{
	"aws_access_key_id": "ASIA4C5S3JZE5VVF5G54",
	"aws_secret_access_key": "F63IGajx4HCN4InXspZfpgUgt4wNuuhrANjfK1pp",
	"aws_session_token": "FwoGZXIvYXdzEJv//////////wEaDC3dmR8uEw+hKpCXwiLFAdEALpH2icU2OAecwT7//HVCsIe9pnIhKKPLJsCLGhiGU65y/SLu7VqedzgW9bX40LArROc9gK1l+R9LnFXLWZoy+prPwJlKtj4jzytvfytJlt4Gu92rAOEK+yS9SNU1nk93gzQvFtQedHM2fOWVAl7SLVIJ4+mvEcJKUHxAP7kvgatz6EIBKKs6mUpGlxZCdW7qtezyId+BU5ojmXYt1fkNel0/LrDoHeNusZwfRdEiSbBDhtXL0hqpu55Z6oLq3xedvhHOKIe0qPQFMi2zcyWXLQBc+PJyUmYRx+SdwiQsG+nL4ScQweD/nSlGmxvWis4nUtep7w4o8c8="
}
```

#### Load HTML client
Server provides client for loading AWS keys:
"server address"/html

Keys you can get from:
https://www.awseducate.com/signin/SiteLogin -> Login -> My Classroms -> Go to classroom -> Continue -> Account Details -> Show.
Copy everything from gray background and paste to textfield in "server address"/html

### WebSocket
All requests MUST be JSON type
Boilerplate for any request:
```
{
    type: string,
    payload: {
        
    }
}
```

## Auth
### welcome (stage 1)
Fetch user id which allows to participate in game.
```
{
    type: 'auth_welcome',
    payload: {}
}
```
Valid response example:
```
    {"type":"auth_welcome-success",
        "payload":{
        "id":"1a31483e-35c1-4034-a98f-23ad369bb3a2"
        }
    }
```

### check (stage any)
Allow check if user id is valid
```
{
    type: 'auth_check',
    payload: {
        id: 'user id'
    }
}
```
Valid response example:
```
    {"type":"auth_welcome-success",
        "payload":{
        "id":"1a31483e-35c1-4034-a98f-23ad369bb3a2"
        }
    }
```

## Game
### start (stage 1)
Allows admin to start game - only available for administartor.
```
{
    type: 'game_start',
    payload: {
        id: 'player id(u can fetch it by ws request auth_welcome')
    }
}
```

# Player

## ready (stage 1)

Allow to change player ready status (only in stage 1)
(when at least two players send ready(true) status game starts)
Request example
```
{
    type: 'player_ready',
    payload: {
        id: 'player id(u can fetch it by ws request auth_welcome'),
        ready: true/false
    }
}
```

## name (stage 1)

Allow to change player name (only in stage 1)

Request example
```
{
    type: 'player_name',
    payload: {
        id: 'player id(u can fetch it by ws request auth_welcome'),
        name: 'abc'
    }
}
```


## ping (stage 1)

Allows player keep ready status (only in stage 1)

Request example
```
{
    type: 'player_ping',
    payload: {
        id: 'player id(u can fetch it by ws request auth_welcome')
    }
}
```

## word (stage 2)
Allow palyer to fetch once again his word
Request example
```
{
    type: 'player_word',
    payload: {
        id: 'player id(u can fetch it by ws request auth_welcome')
    }
}
```

## answer (stage 2)
Allows player to send img to try win the game.
Server MUST receive "rawdata" to "see" image.
Code to generate RAWDAT: 
```
const processImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          const RAWDATA = e.target.result.split("data:image/png;base64,")[1];
        });
        reader.readAsDataURL(file);
      }
```

Core part:
```
  const RAWDATA = e.target.result.split("data:image/png;base64,")[1];
```
Removes prefix 'data:image/png' to get clear base64.
This prefix is related to image type sended by user so the prefix could also looks like this
data:image/jpg.
Server accepts ONLY clear base64.

Request example
```
{
type: 'player_answer',
    payload: {
      answer: RAWDATA,
      id: (player ID)
    }
}
```

## Server peers notifications

### Players information
Server sends constantly information about connected players
Example

```
{
type: 'players_information',
    payload: {
      information: []
    }
}
```



### Game starts
When game start server will send players words.
Example

```
{
type: 'player_word',
    payload: {
      word: 'Person'
    }
}
```

### Game over
When palyer sends correct photo server will notify all players about winner.

```
{
type: 'game_over',
    payload: {
      winner: 'playerId',
      name: 'player name'
    }
}
```

Dirty code for testing server:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: grey;
        }
    </style>
</head>
<body>
  <h2>File Upload</h2>

  Select file

  <input type="file" id="myFile" />
    <script>
      let id = null;
      const socket = new WebSocket('ws://fast-photo.herokuapp.com');

      const processImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          const rawData = e.target.result.split("data:image/png;base64,")[1];
          socket.send(JSON.stringify({
            type: 'player_answer',
            payload: {
              answer: rawData,
              id
            }
          }));
        });
        reader.readAsDataURL(file);
      }

      document.getElementById("myFile").addEventListener("change", processImage, false);


        socket.addEventListener('open', (e) => {
            socket.send(JSON.stringify({
                type: 'auth_welcome',
                payload: {}
            }));
        });
        socket.addEventListener('message', async (message) => {
            const div = document.createElement('div');
            div.innerText = message.data;
            document.body.appendChild(div);
            const parsedMessage = await JSON.parse(message.data);
            if(parsedMessage.type === 'auth_welcome-success'){
              id=parsedMessage.payload.id;
                socket.send(JSON.stringify({
                    type: 'player_ready',
                    payload: {
                        id: parsedMessage.payload.id,
                        ready: true
                    }
                }));
            }
        })
    </script>
</body>
</html>
```