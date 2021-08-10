import { IncomingMessage, ServerResponse } from 'http';

import IContactController from './IContractController';
import Contact from '../repositories/ContactRepository';
import responseFunction from '../utils/response';

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
        return responseFunction(res, 200, contacts, 'message');
      }

      return responseFunction(res, 404, 'Não há usuários cadastrados.', 'error');
    } catch (err) {
      console.log(err);
      return responseFunction(res, 500, 'Erro no servidor.', 'error');
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
        return responseFunction(res, 400, 'Nome, email e o usuário do GitHub são obrigatórios.', 'error');
      }

      if (!validateEmail(email)) {
        return responseFunction(res, 400, 'E-mail inválido.', 'error');
      }
      const verifyGithub = await validateGitHub(github);
      if (!verifyGithub) {
        return responseFunction(res, 400, 'Usário do GitHub não existe.', 'error');
      }

      await this.repo.addNewContact(req.requiredBody);
      return responseFunction(res, 201, 'Contato cadastrado com sucesso.', 'message');
    } catch (err) {
      console.log(err);
      return responseFunction(res, 500, 'Erro no servidor.', 'error');
    }
  }

  public async update(req: IncomingMessage, res: ServerResponse) {
    try {
      const { email, github } = req.body;

      if (!validateFiled(github) && !validateFiled(email)) {
        const verifyGithub = await validateGitHub(github);
        if (!verifyGithub) {
          return responseFunction(res, 400, 'Usário do GitHub não existe.', 'error');
        }

        if (!validateEmail(email)) {
          return responseFunction(res, 400, 'E-mail inválido.', 'error');
        }
      }

      const contact = await this.repo.editContact(req.body);
      if (!contact) {
        return responseFunction(res, 404, 'Contato não encontrado.', 'error');
      }
      return responseFunction(res, 200, 'Contato atualizado com sucesso!', 'message');
    } catch (err) {
      console.log(err);
      return responseFunction(res, 500, 'Erro no servidor.', 'error');
    }
  }

  public async delete(req: IncomingMessage, res: ServerResponse) {
    try {
      const contacts = await this.repo.deleteContact(req.body.id);

      if (!contacts) {
        return responseFunction(res, 404, 'Contato não encontrado.', 'error');
      }
      return responseFunction(res, 200, 'Contato deletado com sucesso.', 'message');
    } catch (err) {
      console.log(err);
      return responseFunction(res, 500, 'Erro no servidor.', 'error');
    }
  }
}

export default new ContactController();
