import User from '../model/User.js';

const uploadProductPermission = async (userId) => {
  const user = await User.findById(userId);

  if (user.role !== 'ADMIN') {
    return false;
  }
  return true;
};

export default uploadProductPermission;
