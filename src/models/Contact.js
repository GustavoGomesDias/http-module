import fs from 'fs/promises';

export default class Contact {
  id;
  name;
  lastName;
  description;
  email;
  github;
  created_at;
  updated_at;

  #contactList;

  async constructor({ id = this.#contactList.length + 1, name, lastName, description, email, github }) {
    this.#contactList = JSON.parse(
      await fs.readFile(new URL('../../../database.json', import.meta.url), 'utf8')
    );
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.description = description;
    this.github = github;
    if (this.#contactList.length > 0) {
      const contactFilter = this.#contactList.filter((contact) => {
        return contact.id === this.id;
      });

      if (contactFilter.length === 0) this.created_at = new Date();
    }

    this.updated_at = new Date();
  }
}
