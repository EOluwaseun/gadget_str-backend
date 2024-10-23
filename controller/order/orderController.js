import Order from '../../model/Order.js';

const orderController = async (request, response) => {
  try {
    const currentUserId = request.userId;

    const orderList = await Order.find({ userId: currentUserId }).sort({
      createdAt: -1,
    });

    response.json({
      data: orderList,
      message: 'Order list',
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
export default orderController;
