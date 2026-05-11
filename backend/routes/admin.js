import express from 'express';
import User from '../models/User.js';
import Tournament from '../models/Tournament.js';
import Product from '../models/Product.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, async (_req, res) => {
  const [users, tournaments, products] = await Promise.all([
    User.countDocuments(),
    Tournament.countDocuments(),
    Product.countDocuments()
  ]);
  res.json({ users, tournaments, products });
});

router.get('/users', protect, adminOnly, async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;
