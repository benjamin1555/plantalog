const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const defaultError = require('../util/default-error');

exports.signup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      username,
      password: hashedPassword
    });
    const savedUser = await user.save();
    res.status(201).json({
      message: 'User successfully created.',
      user: {
        userId: savedUser._id,
        username: savedUser.username
      }
    });
  } catch (err) {
    next(defaultError(err));
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('Wrong email/password.');
      error.statusCode = 401;
      throw error;
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      const error = new Error('Wrong email/password.');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email: user.email,
      userId: user._id.toString()
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'Successfully logged in.',
      token,
      username: user.username,
      userId: user._id.toString()
    });
  } catch (err) {
    next(defaultError(err));
  }
};