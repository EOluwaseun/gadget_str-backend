import Product from '../../model/Product.js';

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await Product.distinct('category');
    //distinct will unique category
    // console.log(productCategory);

    //store one product from each category
    const productByCategory = [];

    //this will filter out one product from each category
    for (const category of productCategory) {
      const product = await Product.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.status(200).json({
      message: 'category product',
      data: productByCategory,
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

export default getCategoryProduct;
