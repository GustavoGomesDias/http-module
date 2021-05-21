import http from 'http';
import UserController from './src/controllers/UserController';
import routes from './src/routes/User';

const port = 3000; // || process.env.PORT;

const app = http.createServer((req, res) => {
  const { methode } = req;

  if (methode === 'GET'){
    UserController.getAllUser(req, res)
  }
});

app.listen(port, () => {
  
  console.log(`Server rodando na porta ${port}`);
});
