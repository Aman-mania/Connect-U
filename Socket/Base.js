import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db=await open({
    filename: 'chat.db',
    driver: sqlite3.Database
});

await db.exec(
    `
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_offset TEXT UNIQUE,
    content TEXT);
    `
);

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
  });


const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('clear chat', async () => {
    try {
      // Delete all messages from the database
      await db.run('DELETE FROM messages');
      
      io.emit('clear chat');
      console.log('Chat cleared');
    } catch (error) {
      console.error('Failed to clear chat:', error);
    }
  });
});

io.on('connection', async(socket)=> {
    socket.on('chat message', async(msg)=>{
        let result;
        try{
            result=await db.run('INSERT INTO messages (content) VALUES (?)', msg);
        }
        catch(e){
            return;
        }
        io.emit('chat message', msg, result.lastID);
    });

    if(!socket.recovered){
        try{
            await db.each('SELECT id, content FROM messages WHERE id > ?',
                [socket.handshake.auth.serverOffset || 0],
                (_err,row)=>{
                    socket.emit('chat message',row.content, row.id);
                }
            )
        }
        catch(e){}
    }
});

server.listen(3002, () => {
    console.log('server running at http://localhost:3002');
});
