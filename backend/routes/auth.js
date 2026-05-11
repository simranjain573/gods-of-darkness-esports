import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const router = express.Router();

const makeToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/signup', async (req, res) => {
  try {
    const { fullName, age, email, username, password, gameSelection, gameId, ign } = req.body;

    if (!fullName || !age || !password || !gameSelection || !gameId || !ign) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    if (!email && !username) {
      return res.status(400).json({ message: 'Email or username is required' });
    }

    const query = email ? { email } : { username };
    const exists = await User.findOne(query);
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      age,
      email,
      username,
      password: hashed,
      gameSelection,
      gameId,
      ign
    });

    const token = makeToken({ id: user._id, isAdmin: user.isAdmin });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = makeToken({ id: user._id, isAdmin: user.isAdmin });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/admin-login', async (req, res) => {
  try {
    const { username, password, adminSecret } = req.body;

    console.log("username: ", username, "password: ", password, "adminSecret: ", adminSecret)

    if (adminSecret !== process.env.ADMIN_SECRET) {
      console.log("secret not match")
      return res.status(401).json({ message: 'Invalid admin secret' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = makeToken({ id: admin._id, isAdmin: true, admin: true });
    res.json({ token, admin: { username: admin.username, role: admin.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;