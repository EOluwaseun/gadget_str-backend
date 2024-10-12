import Cart from '../../model/Cart.js';

async function addToCartController(req, res) {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    // check if the product is already available
    const isProductAvailable = await Cart.findOne({ productId });

    if (isProductAvailable) {
      return res.json({
        message: 'product already exist in cart',
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new Cart(payload);
    const saveProduct = newAddToCart.save();

    res.status(200).json({
      message: 'Product Added to cart',
      data: saveProduct,
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

export default addToCartController;
