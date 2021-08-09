import fs from 'fs';
import path from 'path';

import IContact from './IContact';

export default class Contact implements IContact {
  public id: number;
  public name: string;
  public lastName: string;
  public description: string;
  public email: string;
  public github: string;
  public created_at?: Date;
  public updated_at: Date;

  constructor(id: number, contact: {
    name: string, lastName: string, description: string, email: string, github: string
  }) {
    const { name, lastName, description, email, github } = contact;

    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.description = description;
    this.github = github;

    const contactList: Contact[] = JSON.parse(fs.readFileSync(path.join(__dirname, '../../') + 'database.json', 'utf8'));

    if (contactList.length > 0) {
      const contactFilter = contactList.filter((contact) => {
        return contact.id === this.id;
      });

      if (contactFilter.length === 0) this.created_at = new Date();
    }

    this.updated_at = new Date();
  }
}
