const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  additionalNotes: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    default: 'pending', 
    enum: ['pending', 'in-progress', 'completed', 'archived'] 
  },
  group: { type: String, required: true }, // Group categorization
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
