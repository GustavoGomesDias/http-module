import Contact from '../models/Contact';

function verifyIdExist(id) {
  const infos = Contact.returnAllInfos();

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