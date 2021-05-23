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

  async store(req, res) {
    const infos = req.body;

    const { id } = infos;

    if (_.verifyIdExist(id) == true) {
      return res.writeHead(400, {
        'Content-Type': 'application/json',
      })
      .write(JSON.stringify({ message: "Este id já está em uso." }));
    }

    try {

      await User.addNewInfos(infos);
      
      return res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      .write(JSON.stringify({ message: "Infos. adiconada com sucesso" }));
    } catch(err) {
      console.log(err);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      })
      .end(JSON.stringify({ message: "Não foi possível adicionar novas informações, tente novamente." }));
    }
    
  }
}

export default new UserController();  