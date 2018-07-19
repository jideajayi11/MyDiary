import app from '../app';
import env from 'dotenv';
import * as http from 'http';

env.config();
/*
*Const port = parseInt(process.env.PORT, 10) || 3000;
*/
 
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

/*
 * Console.log('connected to port');
*/
export default server;