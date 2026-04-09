import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
    gameId: { type: String, required: true },
    ign: { type: String, required: true },
    status: { type: String, default: 'Registered' }
  },
  { timestamps: true }
);

registrationSchema.index({ user: 1, tournament: 1 }, { unique: true });

export default mongoose.model('Registration', registrationSchema);
