import fs from 'fs';
import path from 'path';
import User from '../models/User';

class UserController {
   getAllUser(req, res) {
    const users =  User.returnAllInfos();

    if(users) {
      return res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      .write(JSON.stringify(users));
    }else {
      return res.writeHead(400, {
        'Content-Type': 'application/json',
      })
      .write(JSON.stringify({ error: 'Não há usuários cadastrados.' }));
    }
    
  }

  async store(req, res) {
    const infos = req.body;
    await User.addNewInfos(infos);

    return res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    .write(JSON.stringify({ message: "Infos. adiconada com sucesso" }));
  }
}

export default new UserController();  