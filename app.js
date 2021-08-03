import http, { request } from 'http';
import ContactController from './src/controllers/Contact.js';

const port = 3000;

const app = http.createServer(async (req, res) => {
  const { method } = req;

  if (method === 'GET'){    
    request('http://localhost:3000', await ContactController.getAllContact(req, res));
    res.end();
  }
  
  if (method === 'POST'){
    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });


    req.on('end', async () => {
      const data = Buffer.concat(chunks);
      req.body = JSON.parse(data.toString());
      await ContactController.store(req, res);
      res.end();
    });
  }

});

app.listen(port, () => {
  
  console.log(`Server rodando na porta ${port}`);
});