import Cart from '../../model/Cart.js';

async function updateCartQtyController(req, res) {
  try {
    const curentUser = req.userId;
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await Cart.updateOne(
      { _id: addToCartProductId },
      {
        ...(qty && { quantity: qty }),
        //   if qty is available, update it or leave d value it if update is not needed
      }
    );

    res.status(200).json({
      message: 'Product qty updated',
      data: updateProduct,
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

export default updateCartQtyController;
