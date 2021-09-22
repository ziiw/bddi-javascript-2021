# bddi-javascript-2021

BDDI JavaScript 2021 - Workshop material

## Chat WebSocket Events

### EMIT getUsers

Emit a `users` event on the server with an array of currently connected users payloads, example:

```
[
  { id: '1fe4792f-4141-44da-9bd7-bef4cfbd4916', name: 'Anonymous' },
  { id: '1fed22f-4141-44da-9bd7-oaiz123dazia3', name: 'Anonymous' },
  { id: '1124792f-4141-44da-9bd7-oazubdoazd12', name: 'Anonymous' },
  { id: '1ae4122f-4141-44da-9bd7-iuezra12323g', name: 'Anonymous' },
]
```

## User connection / disconnection

Each time a user connect (or disconnect) himself two emits happen:

Emit a `users` event on the server with the new array of currently connected users payloads, as it does on getUsers event receiption.
Emit a `userConnection` or `userDisconnection` event on the server with a payload of the user that just connected or disconnected himself, example:

```
  { id: '1fe4792f-4141-44da-9bd7-bef4cfbd4916', name: 'Anonymous' }
```

### EMIT setUsername

Need a `string` representing the username

### ON updateUsername

Receive the user that had just updated his username

```
  { id: '1fe4792f-4141-44da-9bd7-bef4cfbd4916', name: 'new username' }
```

### EMIT getMessages

Emit a `messages` event with the array of full messages

```
{
  id: "sdfsdfsdfdsf",
  user: {id: "sdfdsf", name: "toto"},
  value: "message",
  time: 123123123,
};
```

### ON messages

Event sent to receive the whole message history

### ON message

Event sent to receive a new message
