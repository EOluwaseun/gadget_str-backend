import User from '../model/User.js';
import bcrypt from 'bcrypt';

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Error('Already user exist.');
    }

    if (!email) {
      throw new Error('Please provide email');
    }
    if (!password) {
      throw new Error('Please provide password');
    }
    if (!name) {
      throw new Error('Please provide name');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      throw new Error('Something is wrong');
    }

    const payload = {
      ...req.body,
      role: 'GENERAL',
      password: hashedPassword,
    };

    const userData = new User(payload);
    const saveUser = await userData.save();

    res.status(200).json({
      data: saveUser,
      success: true,
      error: false,
      message: 'User created succesfully',
    });
  } catch (err) {
    res.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
}

export default userSignUpController;
