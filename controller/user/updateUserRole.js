import User from '../../model/User.js';

const updateUserController = async (req, res) => {
  try {
    const sessionUser = req.userId;

    const { userId, email, role, name } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(role && { role: role }),
      ...(name && { email: email }),
    };

    const user = await User.findById(sessionUser);

    const updateUser = await User.findByIdAndUpdate(userId, payload);

    res.status(200).json({
      data: updateUser,
      message: 'User role updated',
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default updateUserController;
