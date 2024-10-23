const userLogoutController = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };
    res.clearCookie('token', tokenOption);

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
