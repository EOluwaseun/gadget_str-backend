import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    productId: {
      ref: 'products',
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('cart', cartSchema);
