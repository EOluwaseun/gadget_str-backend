import Cart from '../../model/Cart.js';

const addToCartView = async (req, res) => {
  try {
    const curentUser = req.userId;
    const allProduct = await Cart.find({
      userId: curentUser,

      //populate will show the products
    }).populate('productId');

    res.json({
      data: allProduct,
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

export default addToCartView;
