import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, 
    },
    fileName: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'history' }
);

const History = mongoose.model('History', historySchema);

export default History;
