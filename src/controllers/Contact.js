import Contact from '../repositories/Contact.js';
import { verifyIdExist } from '../validations/validations.js';

class ContactController {
  async getAllContact(req, res) {
    try {
      const contacts = await Contact.getAllContact();

      if (contacts) {
        return res.writeHead(200, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify(contacts));
      } else {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'Não há usuários cadastrados.' }));
      }
    } catch (err) {
      console.log(err);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ error: 'Error interno.' }));
    }
  }

  async store(req, res) {
    try {
      const contact = req.body;

      await Contact.addNewContact(contact);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ message: 'Usuário cadastrado.' }));

    } catch (err) {
      console.log(err);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ error: 'Error interno.' }));
    }
  }


}

export default new ContactController();
