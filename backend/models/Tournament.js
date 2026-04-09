import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema(
  {
    gameName: { type: String, required: true },
    date: { type: Date, required: true },
    entryFee: { type: Number, default: 0 },
    maxPlayers: { type: Number, required: true },
    description: String
  },
  { timestamps: true }
);

export default mongoose.model('Tournament', tournamentSchema);
