import fs from 'fs/promises';
import path from 'path';

import Contact from '../models/Contact';
import IContactRepository from './IContactRepository';

export default class ContactRepository implements IContactRepository {

  public async getAllContacts() {
    try {
      const contacts = JSON.parse(
        await fs.readFile(path.join(__dirname, '../../') + 'database.json', 'utf8')
      );
      return contacts
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async addNewContact( contact: {
    name: string, lastName: string, description: string, email: string, github: string
  }) {
    try {
      const contacts = await this.getAllContacts();
      const id = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
      const newContact: Contact = new Contact(id, contact);

      contacts.push(newContact);

      await fs.writeFile(path.join(__dirname, '../../') + 'database.json', JSON.stringify(contacts));

      return newContact
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async editContact(infos: { id?: number, name?: string, lastName?: string, description?: string, email?: string, github?: string }) {
    try {
      const { id , name = "", lastName = "", description = "", email = "", github = "" } = infos;

      if (id === undefined) return undefined;

      const contacts = await this.getAllContacts();
      const index: number = contacts.map((contact: { id: number}) => contact.id).indexOf(id);
      if (contacts[index]) {
        if (name !== "" && contacts[index].name !== name) contacts[index].name = name;

        if (lastName !== "" && contacts[index].lastName !== lastName) contacts[index].lastName = lastName;

        if (description !== "" && contacts[index].description !== description) contacts[index].description = description;

        if (email !== "" && contacts[index].email !== email) contacts[index].email = email;

        if (github !== "" && contacts[index].github !== github) contacts[index].github = github;

        await fs.writeFile(path.join(__dirname, '../../') + 'database.json', JSON.stringify(contacts));

        return contacts[index];
      } else {
        return undefined
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async deleteContact(id?: number) {
    try {
      if (id === undefined) return undefined;

      const contacts = await this.getAllContacts();
      const contact = contacts.map((contact: { id: number }) => contact.id).indexOf(id);

      if (contact !== -1) {
        contacts.splice(contact, 1);

        await fs.writeFile(path.join(__dirname, '../../') + 'database.json', JSON.stringify(contacts));

        return contacts;
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
