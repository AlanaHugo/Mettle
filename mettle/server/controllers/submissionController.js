import Submission from '../models/Submission.js';

export async function createSubmission(req, res) {
  console.log('createSubmission called with body:', req.body);
  console.log('User from auth middleware:', req.user);

  try {
    const {
      aboutAuth,
      content,
      contact,
      social,
      anonymous,
    } = req.body;

    // Get userId from authenticated user unless anonymous
    let userId;
    let email;

    if (!anonymous) {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized: missing user info' });
      }
      userId = req.user.id;
      // optionally set email if available in req.user.email
      email = req.user.email || undefined;
    }

    // Validate required fields
    if (!aboutAuth || !content) {
      return res.status(400).json({ message: 'Missing required fields: aboutAuth and content are required.' });
    }

    const newSubmission = new Submission({
      userId,
      email,
      aboutAuth,
      content,
      contact,
      social,
      anonymous,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Submission created successfully' });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
