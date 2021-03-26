const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Meeting, Participant } = require('../models');
const withAuth = require('../utils/auth');

//  where did this come from?
// if logged in - render the dashboard.
router.get('/', withAuth, (req, res) => {
  console.log('======================');
// No database calls here yet
// TBD: Determine what goes on dashboard
  res.render('dashboard', {
    loggedIn: true
  });
});



// FIND ALL the meetings for the logged-in user 
// INCLUDE the users who are invited to that meeting
// called with get /dashboard/

router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Meeting.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'date',
      'start', 'end',
      'meeting_name', 'topic'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});





module.exports = router;
