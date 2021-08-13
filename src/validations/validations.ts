import https from 'https';

export const validateFiled = (field: string | undefined) => field === '' || field === ' ' || field === undefined || field === null;

export const validateEmail = (email: string | undefined) => email && email.includes('@');

export const validateGitHub = async (gitHubUser: string | undefined) => {
  if (!gitHubUser) return false;


  const agent = new https.Agent({
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
    await new Promise((resolve, reject) => {
      https.get(options, (res) => {
        let data: string = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const { message } = JSON.parse(data);
          if (message) return reject(message);
          resolve(data);
        });
      }).on("error", reject).end();
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
