const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Meeting } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////
//  THESE ARE THE PARTICIPANT ROUTES
//  * Get all the participants based on meeting ID 
//  * Get all the participants based on organizer ID (?)
//  * ADD specified array of users (?) to Participant table
//  * ADD a single user to participant table
//  * (get all meetings and all participants?)
//  * Change the Accepted flag for a user
//  * delete a user from a meeting
//  * delete a meeting from a user



/////////////////////////////////////////////////////////



// GET ALL MEETINGS 
// vll: need to PUT WITHAUTH BACK IN
// after inquirer testing is done  

// ROUTE: get/api/meetings
router.get('/', (req, res) => {
  Meeting.findAll({
    attributes: ['id', 'date', 'start', 'end', 'meeting_name', 'topic' 
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

// GET MEETINGS BY ORGANIZER ID 
// For testing: user ID in req.params  
// THIS will have to change to the session.user_id
//(but how does it knwo a get all from a get by session ID?)
//  BECAUSE we will eventually need to pass in a
//  meeing :id to display a single meeting
// vll: need to PUT WITHAUTH BACK IN

// ROUTE: get/api/meetings/:id
router.get('/:id', (req, res) => {
  Meeting.findAll({
    where: {
      organizer_id: req.params.id
    },
    attributes: ['id', 'date',
      'start', 'end',
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

// THIS IS CURRENTLY COMMENTED OUT BECAUSE
// USER ID is being passed in for testing
// but eventually it will be the meeting id
// don't forget withAuth

// GET MEETING BY MEETING ID
// Returns one meeting and the person who organized it
// ROUTE: get/api/meetings/:id
// router.get('/:id', (req, res) => {
//   Meeting.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: ['id', 'date', 'start', 'end', 'meeting_name', 'topic' 
//     ],
//     include: {
//       model: User,
//       attributes: ['id', 'firstname', 'lastname']
//     }
//   })
//     .then(dbMeetingData => res.json(dbMeetingData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


//post route to CREATE A NEW MEETING
// called from xxxx
// start and end are integers between 9-17
// indicating office hours
router.post('/', (req, res) => {
  Meeting.create({
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    organizer_id: req.body.organizer_id,
    name: req.body.name,
    topic:req.body.topic
  })
    .then(dbMeetingData => {
      res.json(dbMeetingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  // UPDATE a meeting using its ID
  // the req.body can contain 'date',
  // 'start', 'end', and/or 'organizer_id'

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

// DELETE A MEETING:

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
