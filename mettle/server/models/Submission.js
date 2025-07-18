const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional user reference
  email: { type: String }, // optional email of submitter
  aboutAuth: { type: String, required: true },
  contact: { type: Boolean, default: false },
  anonymous: { type: Boolean, default: false },
  social: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', submissionSchema);
