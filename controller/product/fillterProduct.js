import Product from '../../model/Product.js';

// const filterProductController = async (req, res) => {
//   try {
//     const categoryList = req?.body?.category || [];
//     const product = await Product.find({
//       category: {
//         $in: categoryList,
//       },
//     });

//     res.status(200).json({
//       data: product,
//       message: 'Product',
//       success: true,
//       error: false,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       error: true,
//       message: err.message || err,
//     });
//   }
// };

// export default filterProductController;

const filterProductController = async (req, res) => {
  try {
    const { category, brandName, priceRange } = req.body;

    // Construct query object
    let query = {};

    if (category && category.length > 0) {
      query.category = { $in: category }; // Filters products by category
    }

    if (brandName && brandName.length > 0) {
      query.brandName = { $in: brandName }; // Filters products by brand name
    }

    // Add more filters dynamically as needed (e.g., color, price range)
    // if (color) query.color = color;
    // if (priceRange) query.price = { $gte: priceRange.min, $lte: priceRange.max };
    if (priceRange) {
      const { minPrice, maxPrice } = priceRange;
      query.sellingPrice = { $gte: minPrice, $lte: maxPrice }; // Filters products by price range
    }

    // Fetch filtered products from the database
    const products = await Product.find(query);

    res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default filterProductController;
