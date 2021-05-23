import fs from 'fs';
import path from 'path';

class UserController {
  getAllUser(req, res) {
    const users =  fs.readFileSync(path.join(__dirname, '../../') + 'database.json', 'utf8');

    if(users) {
      return res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      .write(users);
    }else {
      return res.writeHead(400, {
        'Content-Type': 'application/json',
      })
      .write(JSON.stringify({ error: 'Não há usuários cadastrados.' }));
    }
    
  }

   store(req, res) {
    const infos = req.body;
     fs.writeFile(path.join(__dirname, '../../') + 'database.json', JSON.stringify(infos), { flag: 'a' },  (err) => {
      if (err) {
        console.log(err);
        
        return res.writeHead(500, {
          'Content-Type': 'application/json',
        })
        .write(JSON.stringify({ message: "Erro ao adicionar as informações, tente novamente mais tarde." }));
      }

      return res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      .write(JSON.stringify({ message: "Infos. adiconada com sucesso" }));

    });
  }
}

export default new UserController();  