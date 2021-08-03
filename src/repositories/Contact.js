import fs from 'fs/promises';
import Contact from '../models/Contact.js';

export default class ContactRepo {

  async getAllContacts () {
    try {
      const contacts = JSON.parse(
        await fs.readFile(new URL('../../database.json', import.meta.url), 'utf8')
      );
      return contacts;
    } catch (err) {
      console.log(error);
      return undefined;
    }
  }

  async addNewContact(contact) {
    try {
      const newContact = new Contact(contact);

      await fs.writeFile(new URL('../database/database.json', import.meta.url), newContact);

      return contact;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
