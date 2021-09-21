# bddi-javascript-2021

BDDI JavaScript 2021 - Workshop material

## Chat WebSocket Events

### getUsers

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
Emit a `user-connection` or `user-disconnection` event on the server with a payload of the user that just connected or disconnected himself, example:

```
  { id: '1fe4792f-4141-44da-9bd7-bef4cfbd4916', name: 'Anonymous' }
```

### setUsername

Need a `string` representing the username

### getMessages

Emit a `message` event with a message payload

```
{
  id: "1fe4792f-4141-44da-9bd7-bef4cfbd4916",
  user: {id: "12efb-657-123-2k123-bef4cfbd4916", name: ""},
  value: "message content",
  time: timestamp,
};
```

### message

Event sent to receive a new message
