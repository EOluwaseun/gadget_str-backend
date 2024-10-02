import User from '../model/User.js';

async function allUserController(req, res) {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      message: 'All Users',
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default allUserController;
