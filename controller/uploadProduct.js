import uploadProductPermission from '../helper/permission.js';
import Product from '../model/Product.js';

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error('permission denied');
    }

    const uploadProduct = new Product(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(200).json({
      message: 'Product uploaded successfully',
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
}

export default uploadProductController;
