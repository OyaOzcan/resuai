import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  }
}, { timestamps: true });

const CV = mongoose.model('CV', cvSchema);

// BU SATIRI EKLE!
export default CV;
