import Product from '../../model/Product.js';

const searchProductController = async (req, res) => {
  try {
    const query = req.query.q;
    // console.log(query);
    // check if the query is available
    const regex = new RegExp(query, 'i', 'g'); //g for globally search i for case sensitive

    const product = await Product.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.json({
      data: product,
      success: true,
      error: false,
      message: 'product search',
    });
  } catch (err) {
    res.status.json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
};

export default searchProductController;
