export default interface IContact {
  id: number;
  name: string;
  lastName: string;
  description: string;
  email: string;
  github: string;
  created_at?: Date;
  updated_at: Date;
}
