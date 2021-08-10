import { IncomingMessage, ServerResponse } from 'http';

import IContactController from './IContractController';
import Contact from '../repositories/ContactRepository';

import {
  validateEmail,
  validateFiled,
  validateGitHub,
} from '../validations/validations';

class ContactController implements IContactController {
  repo: Contact

  constructor() {
    this.repo = new Contact();
  }

  public async getAll(res: ServerResponse){
    try {
      const contacts = await this.repo.getAllContacts();
      if (contacts.length > 0) {
        return res.writeHead(200, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify(contacts));
      }
      return res.writeHead(404, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ message: 'Não há usuários cadastrados.' }));
    } catch (err) {
      console.log(err);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ error: 'Error interno.' }));
    }
  }

  public async store(req: IncomingMessage, res: ServerResponse) {
    try {
      const {
        name, description, email, github,
      } = req.requiredBody;

      if (
        validateFiled(name) || validateFiled(email) || validateFiled(github) || validateFiled(description)
      ) {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'Nome, email e o usuário do GitHub são obrigatórios.' }));
      }

      if (!validateEmail(email)) {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'E-mail inválido.' }));
      }
      const verifyGithub = await validateGitHub(github);
      if (!verifyGithub) {
        return res.writeHead(400, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ error: 'Usário do GitHub não existe.' }));
      }

      await this.repo.addNewContact(req.requiredBody);

      return res.writeHead(201, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ message: 'Contato cadastrado com sucesso.' }));
    } catch (err) {
      console.log(err);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ error: 'Error interno.' }));
    }
  }

  public async update(req: IncomingMessage, res: ServerResponse) {
    try {
      const { email, github } = req.body;

      if (validateFiled(github) && validateFiled(email)) {
        const verifyGithub = await validateGitHub(github);
        if (!verifyGithub) {
          return res.writeHead(400, {
            'Content-Type': 'application/json',
          }).write(JSON.stringify({ error: 'Usário do GitHub não existe.' }));
        }

        if (!validateEmail(email)) {
          return res.writeHead(400, {
            'Content-Type': 'application/json',
          }).write(JSON.stringify({ error: 'E-mail inválido.' }));
        }
      }

      const contact = await this.repo.editContact(req.body);
      if (!contact) {
        return res.writeHead(404, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ message: 'Contato não encontrado.' }));
      }

      return res.writeHead(200, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ message: 'Contato atualizado com sucesso!' }));
    } catch (err) {
      console.log(err);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ error: 'Error interno.' }));
    }
  }

  public async delete(req: IncomingMessage, res: ServerResponse) {
    try {
      const contacts = await this.repo.deleteContact(req.body.id);

      if (!contacts) {
        return res.writeHead(404, {
          'Content-Type': 'application/json',
        }).write(JSON.stringify({ message: 'Contato não encontrado.' }));
      }

      return res.writeHead(200, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ message: 'Contato deletado com sucesso.' }));
    } catch (err) {
      console.log(err);
      return res.writeHead(500, {
        'Content-Type': 'application/json',
      }).write(JSON.stringify({ error: 'Error interno.' }));
    }
  }
}

export default new ContactController();
