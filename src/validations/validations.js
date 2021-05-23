import User from '../models/User';

function verifyIdExist(id) {
  const infos = User.returnAllInfos();

  const verify = infos.find(info => info.id == id);

  if (verify) {
    return true;
  } else {
    return false;
  }

  
}

export default {
  verifyIdExist,
}