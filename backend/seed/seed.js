import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Tournament from '../models/Tournament.js';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';

dotenv.config();
await connectDB();

await Promise.all([
  User.deleteMany(),
  Tournament.deleteMany(),
  Product.deleteMany(),
  Admin.deleteMany()
]);

const hashed = await bcrypt.hash('Password@123', 10);

await Admin.create({ username: 'godadmin', password: hashed });

await User.create({
  fullName: 'Shadow Reaper',
  age: 21,
  email: 'shadow@godsofdarkness.gg',
  username: 'shadow',
  password: hashed,
  gameSelection: 'BGMI',
  gameId: 'BGMI9988',
  ign: 'DarkFury',
  characterName: 'Revenant',
  leaderboardPoints: 1200,
  matchHistory: [
    { game: 'BGMI', position: '#1', score: 32, date: new Date('2026-03-15') }
  ]
});

await Tournament.insertMany([
  {
    gameName: 'Valorant',
    date: new Date('2026-04-15'),
    entryFee: 10,
    maxPlayers: 64,
    description: 'Clash in neon arenas'
  },
  {
    gameName: 'Free Fire',
    date: new Date('2026-04-30'),
    entryFee: 5,
    maxPlayers: 100,
    description: 'Battle royale weekend'
  }
]);

await Product.insertMany([
  {
    name: 'Gods of Darkness Jersey',
    description: 'Official pro jersey',
    price: 49,
    category: 'Jersey',
    image: 'https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Nightfall Hoodie',
    description: 'Premium esports hoodie',
    price: 59,
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Stealth Mousepad',
    description: 'Speed surface XL',
    price: 19,
    category: 'Accessory',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80'
  }
]);

console.log('Seed data inserted');
process.exit(0);
