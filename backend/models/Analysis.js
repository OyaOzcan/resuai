import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  resultText: String,
  suitability: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Analysis', analysisSchema);
