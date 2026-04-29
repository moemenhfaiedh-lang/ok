const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// 1. IMPORTANT: You must import the Exercise model to delete user workouts
const Exercise = require('../models/Exercise'); 

// @route   GET api/user/me
// @desc    Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error("GET /me error:", err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/user/me
// @desc    Delete user account and their workout data
router.delete('/me', auth, async (req, res) => {
  try {
    // 2. This will now work because 'Exercise' is imported above
    await Exercise.deleteMany({ user: req.user.id });

    // 3. Delete the user
    const user = await User.findByIdAndDelete(req.user.id);
    
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User and workout data deleted successfully' });
  } catch (err) {
    console.error("DELETE /me error:", err.message);
    res.status(500).send('Server Error');
  }
});
// @route   PUT api/user/change-password
router.put('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // 1. Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // 2. Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;



