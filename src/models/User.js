import fs from 'fs';
import path from 'path';
import util from 'util';

class User {
  returnAllInfos(){
    const infos =  JSON.parse(fs.readFileSync(path.join(__dirname, '../../') + 'database.json', 'utf8'));
    
    return infos;
  }

  async addNewInfos(infos) {
    const objInfos =  this.returnAllInfos();
    objInfos.push(infos);

    const writeFile =  util.promisify(fs.writeFileSync);

    await writeFile(path.join(__dirname, '../../') + 'database.json', JSON.stringify(objInfos));
  }
}

export default new User();