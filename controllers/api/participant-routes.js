const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Meeting, Participant } = require('../../models');
const withAuth = require('../../utils/auth');

////////////////////////////////////////
//  THESE ARE THE PARTICIPANT ROUTES
//  (P1a) Get all the participants based on meeting ID 
//    /api/participants/?qtype=participants&qid=[meeting id]
//    -- OR same route different query parameters --
//  (P1b) Get all the meetings that a user is participating in
//    /api/participants/?qtype=meetings&qid=[the participant id]

//  (P2) ADD a participant and their meeting to Participant table
//  (P3) DELETE a participant from a meeting
//  (P4) Change the Accepted flag for a Participant

/////////////////////////////////////////
//  (P1a) Get all the participants based on meeting ID 
//    /api/participants/?qtype=participants&qid=[meeting id]
//    -- OR same route different query parameters --
//  (P1b) Get all the meetings that a user is participating in
//    /api/participants/?qtype=meetings&qid=[the participant id]
router.get('/', (req, res) => {
  const queryType = req.query.qtype;
  const queryId = req.query.qid

  //find all the participants in the specified meeting
  //return the user info and their list of meetings
  if (queryType == 'participants') {
    Participant.findAll({
      where: {
        meeting_id: queryId
      },
      include: {
        model: User,
        attributes: ['id', 'firstname', 'lastname']
      },
      include: {
        model: Meeting,
        attributes: ['id', 'date',
        'start', 'end',
        'meeting_name', 'topic'
        ],
      }
    })
      .then(dbParticipantData => res.json(dbParticipantData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  // Find the meetings for the specified participant
  // return the meeting info and its list of participants
  else if (queryType == 'meetings') {
    Participant.findAll({
      where: {
        user_id: queryId
      },
      include: {
        model: Meeting,
        attributes: ['id', 'date',
        'start', 'end',
        'meeting_name', 'topic'
        ],
      },
      include: {
        model: User,
        attributes: ['id', 'firstname', 'lastname']
      },
    })
      .then(dbParticipantData => res.json(dbParticipantData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  else {
    const qError="request not recognized"
    res.status(501).json(qError);
  }
});

/////////////////////////////////////////////////////////
//  (P2) POST a participant and  meeting to Participant table
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

//  (P3) DELETE a user/meeting entry, effecvely
//  removing that user from the meeting
// there could be other routes, like remove ALL
// of a user's meetings, but that' not in the spec. 
// DELETE api/participants  - user id and meeting id in body.

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

module.exports = router;
