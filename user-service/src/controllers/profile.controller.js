const Profile = require('../models/profile.model');

// Get profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).send({ message: 'Profile not found' });
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create or update profile
const upsertProfile = async (req, res) => {
  const { username, email, bio, profileImage } = req.body;

  try {
    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      profile = new Profile({
        userId: req.userId,
        username,
        email,
        bio,
        profileImage,
      });
    } else {
      profile.username = username || profile.username;
      profile.email = email || profile.email;
      profile.bio = bio || profile.bio;
      profile.profileImage = profileImage || profile.profileImage;
    }

    await profile.save();
    res.status(200).send({ message: 'Profile saved successfully', profile });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).send({ message: 'Profile not found' });
    }

    await profile.remove();
    res.status(200).send({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getProfile, upsertProfile, deleteProfile };
