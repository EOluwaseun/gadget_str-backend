import Cart from '../../model/Cart.js';

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await Cart.countDocuments({
      userId: userId,
    });
    res.json({
      data: {
        count: count,
      },
      message: 'OK',
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

export default countAddToCartProduct;
