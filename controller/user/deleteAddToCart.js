import Cart from '../../model/Cart.js';

async function deleteCartProductController(req, res) {
  try {
    const curentUser = req.userId;
    const addToCartProductId = req.body._id;

    const deleteProduct = await Cart.deleteOne({ _id: addToCartProductId });

    res.status(200).json({
      message: 'Product deleted from cart',
      data: deleteProduct,
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

export default deleteCartProductController;
