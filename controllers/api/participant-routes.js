const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Meeting, Participant } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////
//  THESE ARE THE PARTICIPANT ROUTES
//  (P0) Get the table without includes
//  (P1) GET all the meetings for a specified user 
//       /api/participants/meeting/:user_id
//  (P2) GET all the users for a specified meeting
//      /api/participants/users/:meeting_id
//  (P3) ADD a participant and  meeting pair to Participant table
//  (P4) DELETE a participant from a meeting
//  (P5) UPDATE the Accepted flag for a Participant
//       put /api/participants/  
// user_id: req.body.user_id,
// meeting_id: req.body.meeting_id,
// accepted:req.body.accepted
//////////////////////////////////////////////////
// GET ALL user/meeting entries from Participants
// Might be useful for an admin or something?

router.get('/', (req, res) => {
  Participant.findAll({

  })
    .then(dbParticipantData => {
      if (!dbParticipantData) {
        res.status(404).json({
          message:
            `No participants found`
        });
        return;
      }
      res.json(dbParticipantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


/////////////////////////////////////////
//  (P1) Get all meetings for specified user
//    /api/participants/meetings/:user_id

router.get('/meetings/:id', (req, res) => {
  Participant.findAll({
    where: {
      user_id: req.params.id
    },
    include: [{
      model: User,
      attributes: ['id', 'firstname', 'lastname']
    },
    {
      model: Meeting,
      attributes: ['id', 'date',
        'start', 'end',
        'meeting_name', 'topic'
      ],
    }]
  })
    .then(dbParticipantData => {
      if (!dbParticipantData) {
        res.status(404).json({
          message:
            `No meeting found for user: ${req.params.id}`
        });
        return;
      }
      res.json(dbParticipantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/////////////////////////////////////////
//  (P2) Get all the users for a specified meeting_id
//      /api/participants/users/:meeting_id

router.get('/users/:id', (req, res) => {
  Participant.findAll({
    where: {
      meeting_id: req.params.id
    },
    include: [{
      model: User,
      attributes: ['id', 'firstname', 'lastname']
    },
    {
      model: Meeting,
      attributes: ['id', 'date',
        'start', 'end',
        'meeting_name', 'topic'
      ],
    }]
  })
    .then(dbParticipantData => {
      if (!dbParticipantData) {
        res.status(404).json({
          message:
            `No meeting found for meeting: ${req.params.id}`
        });
        return;
      }
      res.json(dbParticipantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


/////////////////////////////////////////////////////////
//  (P3) ADD A PARTICIPANT AND MEETING pair
//  post /api/participants/
//  leave "accepted" flag null for user to later accept or decline

router.post('/', (req, res) => {
  Participant.create({
    meeting_id: req.body.meeting_id,
    user_id: req.body.user_id,
  })
    .then(dbMeetingData => {
      res.json(dbMeetingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  (P4) DELETE a user/meeting pair, effectively
//  removing that user from the meeting
// there could be other routes, like remove ALL
// of a user's meetings, but that' not in the spec. 
// DELETE api/participants  - user id and meeting id in body.

// only question - is this an and?

router.delete('/', (req, res) => {
  Participant.destroy({
    where: {
      user_id: req.body.user_id,
      meeting_id: req.body.meeting_id
    }
  })
    .then(dbParticipantDataa => {
      if (!dbParticipantDataa) {
        res.status(404).json({ message: `No match found with  user_id: ${user_id}meeting_id: & ${meeting_id}` });
        return;
      }
      res.json(dbParticipantDataa);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

////////////////////////////////////
//  Update "accepted" flag
//  
//  put api/participants/?user=id&meeting=id


router.put('/', (req, res) => {
  Participant.update(req.body, {
    individualHooks:true,
    where: {
      user_id: req.query.user,
      meeting_id: req.query.meeting
    }
  })
    .then(dbParticipantDataa => {
      if (!dbParticipantDataa) {
        res.status(404).json({ message: `No match found with  user_id: ${user_id}meeting_id: & ${meeting_id}` });
        return;
      }
      res.json(dbParticipantDataa);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});


module.exports = router;
