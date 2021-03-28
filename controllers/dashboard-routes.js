const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Meeting, Participant } = require('../models');
const withAuth = require('../utils/auth');

// FIND ALL the meetings for the logged-in user 
// INCLUDE the users who are invited to that meeting
// called with get /dashboard/

router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Participant.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [{
      model: User,
      attributes: ['firstname', 'lastname']
    },
    {
      model: Meeting,
      attributes: ['date',
        'start', 'end',
        'meeting_name', 'topic'
      ],
    }],
  })
    .then(dbData => {
     var myArray = dbData.map((element, i) => {
       var dashboardObject = {
         date: element.dataValues.meeting.date,
         start: element.dataValues.meeting.start,
         end: element.dataValues.meeting.end,
         meeting_name: element.dataValues.meeting.meeting_name,
         topic: element.dataValues.meeting.topic,
       }
       return dashboardObject
     })
      res.render('dashboard', { meetingObj: myArray });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
