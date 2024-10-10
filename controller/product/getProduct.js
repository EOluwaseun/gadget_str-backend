import Product from '../../model/Product.js';

const getProductController = async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'All product',
      error: false,
      success: true,
      data: allProduct,
    });
  } catch (err) {
    res.status.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
};
export default getProductController;
