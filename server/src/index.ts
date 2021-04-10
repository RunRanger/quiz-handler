import express from 'express';
import { Socket, Server } from 'socket.io';
import candidates, { addCandidate, ICandidate } from './candidates';
import sessions from './sessions';


const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);
let buzzerList = [];

io.on('connection', (socket: Socket) => {
  let candidate: ICandidate | null = null;

  ///////////////////////// CANDIDATES ////////////////////
  socket.on("register", (name: string) => {
    candidate = addCandidate(name);
    if (!candidate) {
      socket.emit("register", null);
      return;
    }

    sessions[name] = {
      client: socket,
      candidate: candidate,
      id: socket.id
    }
    socket.emit("register", candidate);

    if (sessions["admin"]) {
      sessions["admin"].client.emit("register", candidate)
    }
  })

  socket.on("buzzer", (name: string) => {
    if (buzzerList.includes(name)) return;
    buzzerList.push(name);
    io.emit("buzzer", buzzerList);
  });

  ///////////////////////// ADMIN ////////////////////
  socket.on("admin", () => {
    if (sessions["admin"]) {
      socket.emit("admin", null);
      return;
    }
    sessions["admin"] = {
      id: socket.id,
      candidate: null,
      client: socket
    }
    socket.emit("admin", candidates);
  });

  socket.on("kick", (name: string) => {
    if (!sessions[name]) return;
    sessions[name].client.disconnect(true);
    delete candidates[name];
    delete sessions[name];
    socket.emit("update", candidates);

  });

  socket.on("resetBuzzer", () => {
    buzzerList = [];
    io.emit("buzzer", []);
  })

  ///////////////////////// BOTH ////////////////////
  socket.on("disconnect", () => {
    if (sessions["admin"] && sessions["admin"].id === socket.id) {
      delete sessions["admin"];
    }
    else {
      Object.keys(sessions).forEach(name => {
        if (sessions[name].id === socket.id) {
          sessions[name].candidate.active = false;
          if (sessions["admin"])
            sessions["admin"].client.emit("status", { name: name, status: false });
        }
      })
    }
  })
});


server.listen(3002, () => {
  console.log('listening on *:3002');
});