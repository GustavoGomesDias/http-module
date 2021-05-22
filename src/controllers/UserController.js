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

  // show(name, lastname, email, github) {


  // }
}

export default new UserController();  