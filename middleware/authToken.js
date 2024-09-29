import jwt from 'jsonwebtoken';

function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: 'User not Login',
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, function (err, decoded) {
      //   console.log(err);
      //   console.log(decoded);

      if (err) {
        console.log('error auth', err);
      }

      req.userId = decoded?._id;
      next();
    });
    // console.log('token', token);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      success: false,
      error: true,
    });
  }
}

export default authToken;
