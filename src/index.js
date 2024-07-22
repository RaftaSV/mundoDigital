import 'dotenv/config';
import router from './routes/index.js';
import  initialServer  from './Server/index.js';
const startServer = initialServer(router);
export default startServer;
