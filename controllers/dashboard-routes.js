const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Meeting, Participant } = require("../models");
const withAuth = require("../utils/auth");

// FIND ALL the meetings for the logged-in user
// INCLUDE the users who are invited to that meeting
// called with get /dashboard/


router.get("/", withAuth, (req, res) => {
  var mappedParticipantArray, mappedOrganizerArray;
  console.log("======================");
  // Finds participants based on user_id
  // includes User and Meeting attributes
  Participant.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ["firstname", "lastname"],
      },
      {
        model: Meeting,
        attributes: ["date", "start", "duration", "meeting_name", "topic"],
      },
    ],
  })
    // Maps the meeting data and returns the participant data
    .then((dbData) => {
      var mappedParticipantArray = dbData
        .map((element, i) => {
          var meetingArray1 = {
            date: element.dataValues.meeting.date,
            start: element.dataValues.meeting.start,
            duration: element.dataValues.meeting.duration,
            meeting_name: element.dataValues.meeting.meeting_name,
            topic: element.dataValues.meeting.topic,
          };
          return meetingArray1;
        })
      // return mappedParticipantArray;
      // (dbData) => {
        Meeting.findAll({
          where: {
            organizer_id: req.session.user_id,
          },
          attributes: ["date", "start", "duration", "meeting_name", "topic"],
        })
          .then((dbData2) => {
            var mappedOrganizerArray = dbData2
              .map((element, i) => {
                var meetingArray2 = {
                  date: element.dataValues.date,
                  start: element.dataValues.start,
                  duration: element.dataValues.duration,
                  meeting_name: element.dataValues.meeting_name,
                  topic: element.dataValues.topic
                };
                return meetingArray2;
              });
            res.render("dashboard", {
              participantObj: mappedParticipantArray,
              meetingObj: mappedOrganizerArray
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      // }
    })
  
})


// LOADS THE ADD-MEETING PAGE with a form for
// submitting the new meeting.

router.get("/add-meeting/", withAuth, (req, res) => {
  res.render("add-meeting", {
    loggedIn: true,
  });
});

module.exports = router;
