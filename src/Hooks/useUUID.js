import { v4 as uuidv4 } from 'uuid';

const getDeviceUUID = async () => {

  let deviceUUID = localStorage.getItem('deviceUUID');
  if (!deviceUUID) {
    deviceUUID = uuidv4();
    localStorage.setItem('deviceUUID', deviceUUID);
  }

  return deviceUUID;
};

export default getDeviceUUID;
