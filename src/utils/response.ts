import { ServerResponse } from 'http';

const responseFunction = (res: ServerResponse, status: number, message: string | object, type: string) => {
  if (type === 'error') {
    return res.writeHead(status, {
      'Content-Type': 'application/json',
    }).write(JSON.stringify({ error: message }));
  }
  return res.writeHead(status, {
    'Content-Type': 'application/json',
  }).write(JSON.stringify({ message: message }));
};

export default responseFunction;
