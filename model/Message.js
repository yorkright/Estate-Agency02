import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
