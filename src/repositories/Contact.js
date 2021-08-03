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
      const contacts = await this.getAllContacts();
      const newContact = new Contact(contacts.length + 1, contact);

      contacts.push(newContact);

      await fs.writeFile(new URL('../../database.json', import.meta.url), JSON.stringify(contacts));

      return contact;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
