import Product from '../../model/Product.js';

const getCategoriesWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await Product.find({ category });

    res.status(200).json({
      data: product,
      message: 'Product',
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
};

export default getCategoriesWiseProduct;
