import http from 'http';
import ContactController from './controllers/ContactController';

declare module 'http' {
  // eslint-disable-next-line no-unused-vars
  interface IncomingMessage {
    body: {
      id?: number;
      name?: string;
      lastName?: string;
      description?: string;
      email?: string;
      github?: string;
    };

    requiredBody: {
      name: string;
      lastName: string;
      description: string;
      email: string;
      github: string;
    };
  }
}

const port: number = 3000;

const app: http.Server = http.createServer(async (req, res) => {
  const { method }: http.IncomingMessage = req;

  if (method === 'GET') {
    await ContactController.getAll(res);
    res.end();
  }

  if (method === 'POST') {
    const chunks: Array<Buffer> = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      const data: Buffer = Buffer.concat(chunks);
      req.requiredBody = JSON.parse(data.toString());
      await ContactController.store(req, res);
      res.end();
    });
  }

  if (method === 'DELETE') {
    const chunks: Array<Buffer> = [];
    req.on('data', (chunk: Buffer) => {
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
    req.on('data', (chunk: Buffer) => {
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
