# Http module
Desmitificando a mágica do Express

## 📕 Sumário
1. [Roadmap](https://github.com/GustavoGomesDias/http-module#1--roadmap)
2. [Tecnologias usadas](https://github.com/GustavoGomesDias/http-module#2-tecnologias-usadas)
3. [Como rodar](https://github.com/GustavoGomesDias/http-module#3-como-rodar)
4. [Voltar para o JS puro](#);


## 1. 🗺 Roadmap
- [x] Fazer o server subir localmente (Hello World);

---

- [x] CRUD Contact
  - [x] GET
  - [x] POST
  - [x] PUT
  - [x] DELETE

---

- [x] Banco de Dados
  - [x] Arquivo do tipo JSON;

---

- [x] Tests
  - [x] Should get all contacts
  - [x] Should create a new contact (beforeAll)
  - [x] Should delete a contact by id (afterAll)
  - [x] Should update a contact by id

- [ ] Refatoração
  - [x] ES Lint
  - [ ] TypeScrypt
  - [ ] Usar mongo ou algum banco de dados SQL sem ORM

## 2. Tecnologias usadas
- Node
- Jest
- Typescript
- ES Lint

## 3. Como rodar
1. Para rodar localmente, você precisará de uma ferramente de teste de requisições como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/):
```bash
npm run dev
```
2. Para rodar os testes, você precisará instalar o Jest primeiro:
```bash
npm install
```
3. Agora basta rodar o comando `npm run test` e o resultado será demonstrado.

## 4. Voltar para o JS puro
Caso você queira voltar para o js, você pode dar um hard reset até o último commit q ainda não tinha nada de TS instalado:
```bash
git reset --hard 2173d98c4d766eb321ea8a205661cf480584c51c
```
VocÊ também precisará forçar o commit (se for commitar), o comando é:
```bash
git push -f origin main
```

## Autor
<table>
  <tr>
    <td align="center"><a href="https://github.com/GustavoGomesDias"><img src="https://github.com/GustavoGomesDias.png" width="100px;" alt="Profile"/><br /><sub><b>Gustavo</b></sub></a><br /><a href="https://github.com/GustavoGomesDias" title="Code">😎</a></td>
  <tr>
</table>


## LICENCE
### MIT
