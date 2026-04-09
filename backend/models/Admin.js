import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'superadmin' }
  },
  { timestamps: true }
);

export default mongoose.model('Admin', adminSchema);
