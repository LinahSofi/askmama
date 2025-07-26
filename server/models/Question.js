const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// ✅ Add virtual populate for answers
questionSchema.virtual('answers', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'question'
});

// ✅ Include virtuals in output
questionSchema.set('toObject', { virtuals: true });
questionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Question', questionSchema);