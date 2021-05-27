import User from '../models/User';
import _ from '../validations/validations';

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

  store(req, res) {
    const infos = req.body;
    const { id } = infos;

    return _.verifyIdExist(id) ? res.writeHead(400, {
      'Content-Type': 'application/json',
    }).write(JSON.stringify({ error: 'Id em uso.' }))
    :
    res.writeHead(200, {
      'Content-Type': 'application/json',
    }).write(JSON.stringify({ message: 'Usuário cadastrado.' }));
  }
}

export default new UserController();  