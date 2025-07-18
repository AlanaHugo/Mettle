exports.createSubmission = async (req, res) => {
  console.log("createSubmission called with body:", req.body); 
  try {
    // Extract fields from request body
    const {
      aboutAuth,
      content,
      contact,
      social,
      anonymous,
    } = req.body;

    // Initialize user-related variables
    let userId = undefined;
    let email = undefined;

    // If submission is NOT anonymous, check user info from auth middleware
    if (!anonymous) {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: missing user info" });
      }

      userId = req.user.id;

      // Optionally, fetch user email if you want to save it with submission
      // const user = await User.findById(userId).select("email");
      // email = user?.email;
    }

    // Validate required fields
    if (!aboutAuth || !content) {
      return res.status(400).json({ message: "Missing required fields: aboutAuth and content are required." });
    }

    // Create a new Submission instance with the data
    const newSubmission = new Submission({
      userId,
      email,
      aboutAuth,
      content,
      contact,
      social,
      anonymous,
    });

    // Save to database
    await newSubmission.save();

    // Respond with success status
    res.status(201).json({ message: "Submission created successfully" });

  } catch (error) {
    // Log the error stack for debugging in backend console
    console.error("Error creating submission:", error);

    // Send generic error response with error message (avoid exposing sensitive info)
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
