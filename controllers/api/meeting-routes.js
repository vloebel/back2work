const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Meeting } = require('../../models');
const withAuth = require('../../utils/auth');


// get all the meetings 
// vll: after testing add withAuth - not sure insomnia 
// works otherwise
router.get('/', (req, res) => {
  Meeting.findAll({
    attributes: ['date', 'start', 'end', 'organizer_id'],
  })
    .then(dbMeetingData => res.json(dbMeetingData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get route to FIND ONE USER AND RETURN THEIR MEETINGS
// THIS ISN'T GOING TO WORK BECAUSE THEY CAN HAVE MORE THAN ONE MEETING
// SO YOU NEED A MEETING FINDALL
// called from xxxx
router.get('/:id',  (req, res) => {
  User.findOne({
    attributes: ['firstname', 'lastname' ],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Meeting,
        attributes: ['date', 'start', 'end', 'organizer_id'],
      }
    ]
  })
    .then(dbMeetingData => {
      if (!dbMeetingData) {
        res.status(404).json({ message: `No meeting found with id: ${req.params.id}`});
        return;
      }
      res.json(dbMeetingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post route to CREATE A NEW MEETING
// called from xxxx
// start and end are integers between 9-17
// indicating the office day
router.post('/:id', (req, res) => {
  Meeting.create({
    date: req.body.date,
    start: req.body.start,
    end: req.body.end,
    organizer_id: req.params.id
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

  // pass in req.body instead to only update what's passed through
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

// DELETE A MEETING: It's not entirely clear how
// this propagates to people who are enrolled!
// xxxxxxxxxxxxxxxxxxx
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
