const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt.utils');
require('dotenv').config();

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).send({ message: 'User registered successfully!', user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(404).send({ message: 'User not found.' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });

    const token = generateToken({ id: user.id, username: user.username, role: user.role });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { signUp, signIn };

