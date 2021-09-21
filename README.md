# bddi-javascript-2021

BDDI JavaScript 2021 - Workshop material

## Chat WebSocket Events

### getUsers

Emit a `user` event per user on the server with a user payload, example:

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
