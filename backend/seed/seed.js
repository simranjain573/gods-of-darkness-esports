import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Tournament from '../models/Tournament.js';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';

dotenv.config();
await connectDB();

const hashed = await bcrypt.hash('Password@123', 10);

// Insert default admin if not already present
const adminExists = await Admin.findOne({ username: 'godadmin' });
if (!adminExists) {
  await Admin.create({ username: 'godadmin', password: hashed });
}

// Insert default user if not already present
const userExists = await User.findOne({ username: 'shadow' });
if (!userExists) {
  await User.create({
    fullName: 'Shadow Reaper',
    age: 21,
    email: 'shadow@godsofdarkness.gg',
    username: 'shadow',
    password: hashed,
    gameSelection: 'BGMI',
    gameId: 'BGMI9988',
    ign: 'DarkFury',
    leaderboardPoints: 1200,
    matchHistory: [
      { game: 'BGMI', position: '#1', score: 32, date: new Date('2026-03-15') }
    ]
  });
}

// Insert default tournaments if not already present
const tournamentCount = await Tournament.countDocuments();
if (tournamentCount === 0) {
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
}

// Insert default products if not already present
const productCount = await Product.countDocuments();
if (productCount === 0) {
  await Product.insertMany([
    {
      name: 'GOD Esports Shadow Backpack',
      description: 'Stylish and spacious backpack for gaming, college, and travel.',
      price: 1499,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Phantom Steel Bottle',
      description: 'Durable steel bottle with a sleek esports design.',
      price: 699,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Reaper Keychain',
      description: 'Compact esports keychain with premium reaper design.',
      price: 249,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Ultimate Sticker Pack',
      description: 'Waterproof gaming stickers for laptops and accessories.',
      price: 199,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Gaming Mouse Pad',
      description: 'Smooth and durable mouse pad for gaming and work.',
      price: 499,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Pro Jersey',
      description: 'Lightweight esports jersey with a premium sporty look.',
      price: 999,
      category: 'Jersey',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports High-Top Sneakers',
      description: 'Stylish high-top sneakers with bold esports branding.',
      price: 2199,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Shadow Cap',
      description: 'Comfortable adjustable cap with minimalist esports style.',
      price: 599,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Classic T-Shirt',
      description: 'Soft cotton t-shirt with clean GOD Esports branding.',
      price: 799,
      category: 'Accessory',
      image: '/media/backpack.jpeg'
    },
    {
      name: 'GOD Esports Phantom Hoodie',
      description: 'Premium hoodie designed for comfort and gaming style.',
      price: 1799,
      category: 'Hoodie',
      image: '/media/backpack.jpeg'
    }
  ]);
}

console.log('Seed data inserted');
process.exit(0);