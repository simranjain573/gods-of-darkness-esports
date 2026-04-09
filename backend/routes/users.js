import express from 'express';
import User from '../models/User.js';
import Registration from '../models/Registration.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.put('/me', protect, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  }).select('-password');
  res.json(updated);
});

router.get('/me/registrations', protect, async (req, res) => {
  const registrations = await Registration.find({ user: req.user.id }).populate('tournament');
  res.json(registrations);
});

router.post('/recruitment', async (req, res) => {
  const data = req.body;
  if (!data.name || !data.email || !data.game || !data.experience) {
    return res.status(400).json({ message: 'Missing recruitment fields' });
  }
  res.status(201).json({ message: 'Recruitment application received', application: data });
});

router.get('/leaderboard', async (_req, res) => {
  const topUsers = await User.find().select('fullName ign gameSelection leaderboardPoints stats').sort({ leaderboardPoints: -1 }).limit(10);
  res.json(topUsers);
});

router.get('/match-history/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('fullName ign matchHistory');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

export default router;
