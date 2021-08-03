import https from 'https';

export const validateFiled = (field) => field === '' || field === ' ' || field === undefined || field === null;

export const validateEmail = (email) => email.includes('@');

export const validateGitHub = async (gitHubUser) => {
  const agent = https.Agent({
    keepAlive: true,
    maxSockets: Infinity
  });

  const options = {
    agent: agent,
    hostname: 'api.github.com',
    port: 443,
    method: 'GET',
    path: `/users/${gitHubUser}`,
    headers: {'user-agent': 'node.js'}
  };

  try {
    const teste = await new Promise((resolve, reject) => {
      https.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
          // console.log(JSON.parse(data));
          const { message } = JSON.parse(data);
          if (message) return reject(message);
          resolve();
        });
      }).on("error", reject).end();
    });

    return true;
  } catch (err) {
    return false;
  }
}
