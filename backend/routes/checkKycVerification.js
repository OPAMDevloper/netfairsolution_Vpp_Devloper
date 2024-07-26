const express = require('express');
const User = require('../models/User'); // Import your User model
const router = express.Router();

// Endpoint to check KYC verification status
router.get('/', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user.kycverification);
    res.status(200).json({ kycverification: user.kycverification });
  } catch (error) {
    console.error('Error checking KYC verification:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
