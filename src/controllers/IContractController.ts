import { IncomingMessage, ServerResponse } from 'http';

export default  interface IContactController {
  getAll: (res: ServerResponse) => Promise<boolean>;
  store: (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;
  update: (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;
  delete: (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;
}
