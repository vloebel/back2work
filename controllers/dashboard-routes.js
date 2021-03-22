const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, UserPost } = require('../models');
const withAuth = require('../utils/auth');

// render the dashboard
router.get('/', withAuth, (req, res) => {
  console.log('======================');
// No database calls here yet
// TBD: Determine what goes on dashboard
  res.render('dashboard', {
    loggedIn: true
  });
});




module.exports = router;
