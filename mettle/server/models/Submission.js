// models/Submission.js
// Mongoose schema/model for article submissions

import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional reference
  email: { type: String }, // Optional email of submitter
  aboutAuth: { type: String, required: true },
  contact: { type: Boolean, default: false },
  anonymous: { type: Boolean, default: false },
  social: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
