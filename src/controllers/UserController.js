import fs from 'fs';
import path from 'path';

class UserController {
  getAllUser() {
    return fs.readFileSync(path.join(__dirname, '../../') + 'database.json', 'utf8');
  }
}

export default new UserController();