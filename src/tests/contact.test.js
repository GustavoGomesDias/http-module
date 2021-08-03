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

describe("Create User", () => {
  test("Shoud be create a user", async () => {
    // const agent = https.Agent({
    //   keepAlive: true,
    //   maxSockets: Infinity
    // });
    const options = {
      hostname: 'localhost',
      port: 3000,
      method: 'POST',
      path: '/',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(contact))
      }
    }
    try {
      await new Promise((resolve, reject) => {
        request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
      
          res.on('end', () => {
            console.log(JSON.parse(data));
            const { message } = JSON.parse(data)
            expect(message).toEqual('Usuário cadastrado.');
            resolve();
          });
        }).on("error", reject).end();
      });
    } catch(err) {
      fail(err);
    }
  });
})
