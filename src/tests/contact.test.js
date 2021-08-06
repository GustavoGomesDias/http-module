jest.mock('http');
const http = require('http');
const { request } = jest.requireActual('http');
const { fail } = require('jest');
const fs = require('fs/promises');

jest.setTimeout(6000);

const contact = {
  name: 'Gustavo',
  lastName: 'Dias',
  description: 'Na procura eterna da primeira oportunidade!',
  email: 'email@emaal.com',
  github: 'GustavoGomesDias'
}

const contactUpdate = {
  id: 1,
  name: 'Gustavo Gomes',
  lastName: 'Dias',
  description: 'Ainda na procura eterna da primeira oportunidade!',
  email: 'email@emaal.com',
  github: 'GustavoGomesDias'
}

beforeAll(async () => {
  const agent = http.Agent({
    keepAlive: true,
    maxSockets: Infinity
  });

  const options = {
    agent: agent,
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    path: '/',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(contact))
    }
  }

  const response = () => {
    return new Promise((resolve, reject) => {
      const req = request(options, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const { message } = JSON.parse(data);
          resolve(message);
        });
      }).on('error', (e) => {
        reject(e);
      });

      req.write(JSON.stringify(contact));
      req.end()
    });
  }
  try {
    await response();
  } catch (err) {
    fail(err);
  }
});

afterAll(async () => {
  const agent = http.Agent({
    keepAlive: true,
    maxSockets: Infinity
  });

  const options = {
    agent: agent,
    hostname: 'localhost',
    port: 3000,
    method: 'DELETE',
    path: '/',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify({ id: 1 }))
    }
  }

  const response = () => {
    return new Promise((resolve, reject) => {
      const req = request(options, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const { message } = JSON.parse(data);
          resolve(message);
        });
      }).on('error', (e) => {
        reject(e);
      });

      req.write(JSON.stringify({ id: 1 }));
      req.end()
    });
  }

  try {
    await response();
  } catch (err) {
    fail(err);
  }
});

describe("CRUD Contacts", () => {
  test("Should get all contacts", async () => {
    const agent = http.Agent({
      keepAlive: true,
      maxSockets: Infinity
    });

    const options = {
      agent: agent,
      hostname: 'localhost',
      port: 3000,
      method: 'GET',
      path: '/',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = () => {
      return new Promise((resolve, reject) => {
        const req = request(options, (res) => {
          res.setEncoding('utf8');
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, data: data });
          });
        }).on('error', (e) => {
          reject(e);
        });
        req.end()
      });
    }

    const res = await response();
    expect(res.statusCode).toEqual(200);
  });

  test("Should update a contact by id", async () => {
    const agent = http.Agent({
      keepAlive: true,
      maxSockets: Infinity
    });

    const options = {
      agent: agent,
      hostname: 'localhost',
      port: 3000,
      method: 'PUT',
      path: '/',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(contactUpdate))
      }
    }

    const response = () => {
      return new Promise((resolve, reject) => {
        const req = request(options, (res) => {
          res.setEncoding('utf8');
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            const { message } = JSON.parse(data);
            resolve(message);
          });
        }).on('error', (e) => {
          reject(e);
        });

        req.write(JSON.stringify(contactUpdate));
        req.end();
      });
    }
    expect(await response()).toEqual("Contato atualizado com sucesso!");
  });
});
