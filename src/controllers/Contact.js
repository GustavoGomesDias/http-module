import Contact from '../repositories/Contact.js';
import {
  validateEmail,
  validateFiled,
  validateGitHub
} from '../validations/validations.js';

class ContactController {
  repo

  constructor() {
    this.repo = new Contact();
  }

  async getAllContact(req, res) {
    try {
      const contacts = await this.repo.getAllContacts();
      console.log(contacts.length);
      if (contacts.length > 0) {
        
        return res.writeHead(200, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify(contacts));
      } else {
        console.log('entrou')
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ message: 'Não há usuários cadastrados.' }));
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
      const { name, email, github} = req.body;

      if (validateFiled(name), validateFiled(email), validateFiled(github)) {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'Nome, email e o usuário do GitHub são obrigatórios.' }));
      }

      if (validateEmail(email)) {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'E-mail inválido.' }));
      }

      if (validateGitHub(github)) {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'Usário do GitHub não existe.' }));
      }

      await Contact.addNewContact(req.body);

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
