import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    stock: { type: Number, default: 100 },
    category: { type: String, enum: ['Jersey', 'Hoodie', 'Accessory'], required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
