import http, { request } from 'http';
import UserController from './src/controllers/UserController';
import User from './src/routes/User';

const port = 3000; // || process.env.PORT;

const agent = new Agent();

const app = http.createServer((req, res) => {
  const { method } = req;
  
  const host = agent.getName(app).slice(0, agent.getName(app).length - 1);
  console.log(host);

  if (method === 'GET'){    
    request('localhost:3000/teste', UserController.getAllUser(req, res));
  }

  res.end();

  User(req, res);
});

app.listen(port, () => {
  
  console.log(`Server rodando na porta ${port}`);
});

export default app;