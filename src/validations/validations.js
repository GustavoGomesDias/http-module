import User from '../models/User';

function verifyIdExist(id) {
  const infos = User.returnAllInfos();

  const verify = infos.map(info => info.id == id);

  if (verify) {
    return false
  } else {
    return true;
  }
}

export default {
  verifyIdExist,
}