import http from 'http';

const port = 3000; // || process.env.PORT;

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify({ hw: 'Hello World!!!'  }));
  res.end();
});

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
