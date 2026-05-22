import { Server } from 'socket.io';

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // 👇 Middleware (logging wrapper)
  io.use((socket, next) => {
    const emitOriginal = socket.emit;

    socket.emit = function (...args) {
      console.log('Event emitted:', args[0], 'Payload:', args[1]);

      return emitOriginal.apply(socket, args);
    };

    next();
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  });

  return io;
};
