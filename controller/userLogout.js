const userLogoutController = async (req, res) => {
  try {
    res.clearCookie('token');

    res.json({
      message: 'User logged out successfully',
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
};

export default userLogoutController;
