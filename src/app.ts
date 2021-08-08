import http from 'http';
// eslint-disable-next-line import/extensions
import ContactController from './controllers/Contact.js';

declare module 'http' {
  // eslint-disable-next-line no-unused-vars
  interface IncomingMessage {
    body: object,
  }
}

const port: number = 3000;

// eslint-disable-next-line max-len
const app: http.Server = http.createServer(async (req: http.IncomingMessage, res): Promise<void> => {
  const { method }: http.IncomingMessage = req;

  if (method === 'GET') {
    await ContactController.getAll(req, res);
    res.end();
  }

  if (method === 'POST') {
    const chunks: Array<Buffer> = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      const data: Buffer = Buffer.concat(chunks);
      req.body = JSON.parse(data.toString());
      await ContactController.store(req, res);
      res.end();
    });
  }

  if (method === 'DELETE') {
    const chunks: Array<Buffer> = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      const data: Buffer = Buffer.concat(chunks);
      req.body = JSON.parse(data.toString());
      await ContactController.delete(req, res);
      res.end();
    });
  }

  if (method === 'PUT') {
    const chunks: Array<Buffer> = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      const data = Buffer.concat(chunks);
      req.body = JSON.parse(data.toString());
      await ContactController.update(req, res);
      res.end();
    });
  }
});

app.listen(port, (): void => {
  console.log(`Server rodando na porta ${port}`);
});
