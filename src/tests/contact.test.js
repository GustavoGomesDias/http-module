jest.mock('http');
const http = require('http');
const { request } = jest.requireActual('http');

const contact = {
  name: 'Gustavo',
  lastName: 'Dias',
  description: 'Na procura eterna da primeira oportunidade!',
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

  const response = new Promise((resolve, reject) => {
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
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    req.write(JSON.stringify(contact));
    req.end()
  });
  await response.then((msg) => msg).catch((err) => err);
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

  const response = new Promise((resolve, reject) => {
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
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    req.write(JSON.stringify({ id: 1 }));
    req.end()
  });

  await response.then((msg) => msg).catch((err) => err);
  
})

describe("CRUD Contacts", (done) => {
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

    const response = new Promise((resolve, reject) => {
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
        console.error(`problem with request: ${e.message}`);
        reject(e);
      });
      req.end()
    });

    const res = await response.then((obj) => obj).catch((err) => done(err));

    expect(res.statusCode).toEqual(200);
  });


  // test("Should create a new contact", async () => {
  //   const agent = http.Agent({
  //     keepAlive: true,
  //     maxSockets: Infinity
  //   });

  //   const options = {
  //     agent: agent,
  //     hostname: 'localhost',
  //     port: 3000,
  //     method: 'POST',
  //     path: '/',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Content-Length': Buffer.byteLength(JSON.stringify(contact))
  //     }
  //   }

  //   const response = new Promise((resolve, reject) => {
  //     const req = request(options, (res) => {
  //       res.setEncoding('utf8');
  //       let data = '';
  //       res.on('data', (chunk) => {
  //         data += chunk;
  //       });
  //       res.on('end', () => {
  //         const { message } = JSON.parse(data);
  //         resolve(message);
  //       });
  //     }).on('error', (e) => {
  //       console.error(`problem with request: ${e.message}`);
  //       reject(e);
  //     });

  //     req.write(JSON.stringify(contact));
  //     req.end()
  //   });

  //   const msg = await response.then((msg) => msg).catch((err) => done(err));

  //   expect(msg).toEqual('Contato cadastrado com sucesso.');
  // });

  // test("Should delete a contac by id", async (done) => {
  //   const agent = http.Agent({
  //     keepAlive: true,
  //     maxSockets: Infinity
  //   });

  //   const options = {
  //     agent: agent,
  //     hostname: 'localhost',
  //     port: 3000,
  //     method: 'DELETE',
  //     path: '/',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Content-Length': Buffer.byteLength(JSON.stringify({ id: 1 }))
  //     }
  //   }

  //   const response = new Promise((resolve, reject) => {
  //     const req = request(options, (res) => {
  //       res.setEncoding('utf8');
  //       let data = '';
  //       res.on('data', (chunk) => {
  //         data += chunk;
  //       });
  //       res.on('end', () => {
  //         const { message } = JSON.parse(data);
  //         resolve(message);
  //       });
  //     }).on('error', (e) => {
  //       console.error(`problem with request: ${e.message}`);
  //       reject(e);
  //     });

  //     req.write(JSON.stringify({ id: 1 }));
  //     req.end()
  //   });

  //   const msg = await response.then((msg) => msg).catch((err) => done(err));

  //   expect(msg).toEqual('Contato deletado com sucesso.');
  // });
});
