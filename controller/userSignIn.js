import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function userSignInController(req, res) {
  const { email, password } = req.body;
  try {
    if (!email) {
      throw new Error('Please provide email');
    }
    if (!password) {
      throw new Error('Please provide password');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    // console.log('checkpassword', checkPassword);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.SECRET_ACCESS_KEY, {
        expiresIn: 60 * 60 * 8,
        //60min * 60min = 1hr /// 1hr * 8 = 8rh /// this expires in 8hrs
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie('token', token, tokenOption).status(200).json({
        message: 'Login succesfully',
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error('Please check password');
    }
  } catch (err) {
    res.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
}

export default userSignInController;
