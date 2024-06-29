const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
