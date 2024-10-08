import uploadProductPermission from '../helper/permission.js';
import Product from '../model/Product.js';

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error('permission denied');
    }
    const { _id, ...resBody } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(_id, resBody);

    res.status(200).json({
      message: 'Product uploaded succesfully',
      error: false,
      success: true,
      data: updateProduct,
    });
  } catch (err) {
    res.status.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
};
export default updateProductController;
