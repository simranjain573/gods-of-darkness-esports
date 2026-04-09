import express from 'express';
import Tournament from '../models/Tournament.js';
import Registration from '../models/Registration.js';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const tournaments = await Tournament.find().sort({ date: 1 });
  res.json(tournaments);
});

router.post('/', protect, adminOnly, async (req, res) => {
  const tournament = await Tournament.create(req.body);
  res.status(201).json(tournament);
});

router.post('/:id/register', protect, async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  if (!tournament) return res.status(404).json({ message: 'Tournament not found' });

  const currentCount = await Registration.countDocuments({ tournament: tournament._id });
  if (currentCount >= tournament.maxPlayers) {
    return res.status(400).json({ message: 'Tournament is full' });
  }

  const user = await User.findById(req.user.id);
  const registration = await Registration.create({
    user: user._id,
    tournament: tournament._id,
    gameId: user.gameId,
    ign: user.ign
  });

  res.status(201).json(registration);
});

router.get('/registrations/all', protect, adminOnly, async (_req, res) => {
  const registrations = await Registration.find().populate('user', 'fullName ign').populate('tournament', 'gameName date');
  res.json(registrations);
});

export default router;
