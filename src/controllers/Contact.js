import Contact from '../repositories/Contact';
import { verifyIdExist } from '../validations/validations';

class ContactController {
  async getAllContact(req, res) {
    const contacts = await Contact.getAllContact();

    if (contacts) {
      return res.writeHead(200, {
        'Content-Type': 'application/json',
      })
        .write(JSON.stringify(contacts));
    } else {
      return res.writeHead(400, {
        'Content-Type': 'application/json',
      })
        .write(JSON.stringify({ error: 'Não há usuários cadastrados.' }));
    }

  }

  async store(req, res) {
    try {
      const infos = req.body;
      const { id } = infos;

      if (verifyIdExist(id)) {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'Id em uso.' }));
      }

      await Contact.addNewContact(infos);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ message: 'Usuário cadastrado.' }));

    } catch (err) {
      console.log(error);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ error: 'Error interno.' }));
    }
  }


}

export default new ContactController();