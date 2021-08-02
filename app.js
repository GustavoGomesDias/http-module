import http, { request } from 'http';
import ContactController from './src/controllers/Contact';

const port = 3000;

const app = http.createServer((req, res) => {
  const { method } = req;

  if (method === 'GET'){    
    request('http://localhost:3000/teste', ContactController.getAllContact(req, res));
    res.end();
  }
  
  if (method === 'POST'){
    const chunks = [];
    req.on('data', chunk => {
      chunks.push(chunk)
    });

    req.on('end', function()  {
      const data = Buffer.concat(chunks);
      req.body = JSON.parse(data.toString());
      ContactController.store(req, res);
      res.end();
    });
  }

});

app.listen(port, () => {
  
  console.log(`Server rodando na porta ${port}`);
});