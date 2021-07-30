const ws = require('ws');

const wss = new ws.Server({
  port: 4100,
}, () => console.log('server started on 4100 http://localhost:4100'));

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message)
    switch (message.event) {
      case "connection":
        broadcastMessage(message)
        break;
      case "message":
        broadcastMessage(message)
        break;
    }
  })
})

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message))
  })
}