const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Meeting } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////
//  THESE ARE THE MEETING ROUTES
// NOTE that some changes like withAuth must be made
//  to move from insomnia to a front end
// (MR1) FIND ALL MEETINGS 
//       get api/meetings
// (MR2) FIND ALL MEETINGS by a specified ORGANIZER
//       get /api/meetings/userid/:id 
// (MR3) FIND ONE MEETING by its meeting id 
//       get /api/meetings/id
// (MR4) CREATE NEW MEETING
//       post  api/meetings
// (MR5) UPDATE MEETING by its meeting id
//       put  api/meetings/id
// (MR6) DELETE MEETING by its ID
//       delete  api/meetings/id
/////////////////////////////////////////////////////////

// (MR1) FIND ALL MEETINGS 
// vll: need to PUT WITHAUTH BACK IN
// after inquirer testing is done  

// ROUTE: get/api/meetings
router.get('/', (req, res) => {
  Meeting.findAll({
    attributes: ['id', 'date', 'start', 'duration',
      'meeting_name', 'topic'
    ],
    include: {
      model: User,
      attributes: ['id', 'firstname', 'lastname']
    }
  }
  )
    .then(dbMeetingData => res.json(dbMeetingData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// (MR2) FIND MEETINGS BY ORGANIZER ID 
// vll: need to PUT WITHAUTH BACK IN
// ROUTE: get/api/meetings/userid/:id

router.get('/userid/:id', (req, res) => {
  Meeting.findAll({
    where: {
      organizer_id: req.params.id
    },
    attributes: ['id', 'date',
      'start', 'duration',
      'meeting_name', 'topic'
    ],
    include: {
      model: User,
      attributes: ['id', 'firstname', 'lastname']
    }
  }
  )
    .then(dbMeetingData => res.json(dbMeetingData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// (MR3) FIND MEETING BY MEETING ID 
// get /api/meetings/id

router.get('/:id', (req, res) => {
  Meeting.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'date',
      'start', 'duration',
      'meeting_name', 'topic'
    ],
    include: {
      model: User,
      attributes: ['id', 'firstname', 'lastname']
    }
  }
  )
    .then(dbMeetingData => res.json(dbMeetingData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// (MR4) CREATE  MEETING
// called from add-meeting.js 
// which is loaded in add-meeting.handlebars
// start is a string in the format HH:mm
// duration is a float that should be rounded to 15 min increments
// for example, .25, .5, 1.5  for the corresponding fractions of hours
// organizer_id is set to req.session.user_id .. is this the same?
//
router.post('/', (req, res) => {
  Meeting.create({
    date: req.body.date,
    start: req.body.start,
    duration: req.body.duration,
    meeting_name: req.body.meeting_name,
    topic: req.body.topic,
    organizer_id: req.session.user_id
  })
    .then(dbMeetingData => {
      res.json(dbMeetingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// (MR5) UPDATE a meeting using its ID
// the req.body can contain 'date',
// 'start', 'duration', and/or 'organizer_id'

router.put('/:id', (req, res) => {

  // pass in req.body to only update what's passed through
  Meeting.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbMeetingData => {
      if (!dbMeetingData) {
        res.status(404).json({
          message:
            `No meeting found with id: ${req.params.id}`
        });
        return;
      }
      res.json(dbMeetingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// (MR6) DELETE A MEETING:

router.delete('/:id', (req, res) => {
  Meeting.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbMeetingData => {
      if (!dbMeetingData) {
        res.status(404).json({ message: `No meeting found with id: ${req.params.id}` });
        return;
      }
      res.json(dbMeetingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
