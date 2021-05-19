import http  from 'http';
import UserController from '../controllers/UserController';


const routes = http
              .get('http://localhost:3000', res => {
                res.on('send', UserController.getAllUser);
              });

export default routes;