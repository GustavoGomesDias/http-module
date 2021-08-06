import fs from 'fs/promises';
import Contact from '../models/Contact.js';

export default class ContactRepo {

  async getAllContacts() {
    try {
      const contacts = JSON.parse(
        await fs.readFile(new URL('../../database.json', import.meta.url), 'utf8')
      );
      return contacts
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async addNewContact(contact) {
    try {
      const contacts = await this.getAllContacts();
      const id = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
      const newContact = new Contact(id, contact);

      contacts.push(newContact);

      await fs.writeFile(new URL('../../database.json', import.meta.url), JSON.stringify(contacts));

      return newContact
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async editContact(infos) {
    try {
      const { id, name = "", lastName = "", description = "", email = "", github = "" } = infos;

      const contacts = await this.getAllContacts();
      const index = contacts.map((contact) => contact.id).indexOf(id);
      if (contacts[index]) {
        if (name !== "" && contacts[index].name !== name) contacts[index].name = name;

        if (lastName !== "" && contacts[index].lastName !== lastName) contacts[index].lastName = lastName;

        if (description !== "" && contacts[index].description !== description) contacts[index].description = description;

        if (email !== "" && contacts[index].email !== email) contacts[index].email = email;

        if (github !== "" && contacts[index].github !== github) contacts[index].github = github;

        await fs.writeFile(new URL('../../database.json', import.meta.url), JSON.stringify(contacts));

        return contacts[index];
      } else {
        return undefined
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteContact(id) {
    try {
      const contacts = await this.getAllContacts();
      const contact = contacts.map((contact) => contact.id).indexOf(id);

      if (contact !== -1) {
        contacts.splice(contact, 1);

        await fs.writeFile(new URL('../../database.json', import.meta.url), JSON.stringify(contacts));

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
