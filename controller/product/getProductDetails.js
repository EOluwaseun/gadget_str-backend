import Product from '../../model/Product.js';

const getProductDetailsController = async (req, res) => {
  try {
    // get d id from d body
    const { productId } = req.body;

    const product = await Product.findById(productId);

    res.status(200).json({
      message: 'OK',
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
};
export default getProductDetailsController;
