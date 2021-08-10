export default interface IContactRepository {
  getAllContacts: () => Promise<any>;
  addNewContact: ( contact: {
    name: string, lastName: string, description: string, email: string, github: string
  }) => Promise<any>;

  editContact: (infos: {
    id?: number, name?: string, lastName?: string, description?: string, email?: string, github?: string
  }) => Promise<any>;

  deleteContact: (id?: number) => Promise<any>;
}
