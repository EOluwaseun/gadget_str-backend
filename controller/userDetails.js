import User from '../model/User.js';

async function userDetailController(req, res) {
  try {
    console.log('userId', req.userId);

    const user = await User.findById(req.userId);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: 'User details',
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
export default userDetailController;
