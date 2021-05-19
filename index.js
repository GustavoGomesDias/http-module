import http from 'http';
import UserController from './src/controllers/UserController';

const port = 3000; // || process.env.PORT;

console.log(UserController.getAllUser());

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  http
    .get('http://localhost:3000', res.write(JSON.stringify(UserController.getAllUser())))
    .on('error', error => {
      console.log(error);
      res.write(JSON.stringify(error));
    });

  res.end();
});

app.listen(port, () => {
  
  console.log(`Server rodando na porta ${port}`);
});
