const userLogoutController = async () => {
  try {
    res.clearCookies('token');

    res.json({
      message: 'User logged out successfully',
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
};
