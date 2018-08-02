import * as http from 'http';
import app from '../app';
import env from 'dotenv';

env.config();


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
console.log('connected to port');

export default server;