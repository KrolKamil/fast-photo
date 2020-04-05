# Fast Photo (kek)
## Description
It's university project so all criticial errors are returned to user
To run this app u have to send aws credentials to server.
To restart server go to url/restart
# HTTP API

GET
url\restart - restart server
(usefull if one of players can't send ready status)

POST
url\load
request have to be json type
server requres aws credentials to start working properly
example: 

```
{
	"aws_access_key_id": "ASIA4C5S3JZE5VVF5G54",
	"aws_secret_access_key": "F63IGajx4HCN4InXspZfpgUgt4wNuuhrANjfK1pp",
	"aws_session_token": "FwoGZXIvYXdzEJv//////////wEaDC3dmR8uEw+hKpCXwiLFAdEALpH2icU2OAecwT7//HVCsIe9pnIhKKPLJsCLGhiGU65y/SLu7VqedzgW9bX40LArROc9gK1l+R9LnFXLWZoy+prPwJlKtj4jzytvfytJlt4Gu92rAOEK+yS9SNU1nk93gzQvFtQedHM2fOWVAl7SLVIJ4+mvEcJKUHxAP7kvgatz6EIBKKs6mUpGlxZCdW7qtezyId+BU5ojmXYt1fkNel0/LrDoHeNusZwfRdEiSbBDhtXL0hqpu55Z6oLq3xedvhHOKIe0qPQFMi2zcyWXLQBc+PJyUmYRx+SdwiQsG+nL4ScQweD/nSlGmxvWis4nUtep7w4o8c8="
}
```

### WebSocket
All request MUST be JSON type
All request MUST have this shape:
```
{
    type: string,
    payload: {
        
    }
}
```

## Auth
Fetch user id which allows to participate in game.
### welcome
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

You can also send back id to check if it's valid 
Example request:
```
{
    type: 'auth_welcome',
    payload: {
        "id":"1a31483e-35c1-4034-a98f-23ad369bb3a2"
    }
}
```


# Player

## ready

Allows to change player ready status
(when at least two players send ready(true) status game starts)
Request example
```
{
    type: 'player_ready',
    payload: {
        id: 'player id(u can fetch it by ws request auth_welcome'),
        ready: true
    }
}
```

## answer
Allows player to send img to solve his question word

code to generate RAWDAT: 
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

Code 
```
  const RAWDATA = e.target.result.split("data:image/png;base64,")[1];
```
removes prefix 'data:image/png' to get clear base64.
This prefix is related to image type sended by user so the prefix could also looks like this
data:image/jpg

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


Code for testing(kek)

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