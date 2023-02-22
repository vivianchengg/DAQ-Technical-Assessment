import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';
import { checkTemp } from './check_incident';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    
    socket.on('data', (msg) => {
        console.log(msg.toString());

        try {
            const currJSON = JSON.parse(msg.toString());  
            checkTemp(currJSON.battery_temperature, currJSON.timestamp);
            websocketServer.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg.toString());
                }
            });
        } catch(error) {
            console.error(`Invalid Temperature: ${error}`);
        }   
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});


