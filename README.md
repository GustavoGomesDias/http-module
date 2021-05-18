# Http module
Tentando entender como que funciona a mágica do Express

###### Alguns trecos de códigos eu vou colocar aqui, caso eu queria ver novamente e ele tenha sido excluido por conta de refatoração (EXTRA 1).


## 1. 🗺 Roadmap?
- [x] Fazer o server subir localmente (Hello World);


## EXTRA 1 - Trechos de coódgios antigos

* Hello World
```js
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
  ```