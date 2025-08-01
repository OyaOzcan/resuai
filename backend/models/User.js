import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  refreshToken: { type: String },
});

export default mongoose.model('User', userSchema);
