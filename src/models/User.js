import fs from 'fs';
import path from 'path';
import util from 'util';

class User {
  returnAllInfos(){
    const infos =  JSON.parse(fs.readFileSync(path.join(__dirname, '../../') + 'database.json', 'utf8'));
    
    return infos;
  }

  addNewInfos(infos) {
    const objInfos =  this.returnAllInfos();
    objInfos.push(infos);

    // const writeFile =  util.promisify(fs.writeFileSync);

    fs.writeFile(path.join(__dirname, '../../') + 'database.json', JSON.stringify(objInfos), (err) => {
      if (err) {
        return err;
      }
      return undefined;
    });
  }
}

export default new User();