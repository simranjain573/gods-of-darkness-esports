import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, unique: true, sparse: true },
    username: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    gameSelection: { type: String, required: true },
    gameId: { type: String, required: true },
    ign: { type: String, required: true },
    characterName: { type: String, required: true },
    role: { type: String, default: 'Player' },
    socialLinks: {
      instagram: String,
      youtube: String,
      discord: String
    },
    stats: {
      wins: { type: Number, default: 0 },
      kills: { type: Number, default: 0 },
      matches: { type: Number, default: 0 }
    },
    leaderboardPoints: { type: Number, default: 0 },
    matchHistory: [
      {
        game: String,
        position: String,
        score: Number,
        date: Date
      }
    ],
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
