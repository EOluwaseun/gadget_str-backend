import Order from '../../model/Order.js';
import User from '../../model/User.js';

const allOrderController = async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (user.role !== 'ADMIN') {
    return res.status(500).json({
      message: 'not access',
    });
  }

  const allUser = await Order.find().sort({ createdAt: -1 });
  return res.status(200).json({
    data: allUser,
    success: true,
  });
};

export default allOrderController;
