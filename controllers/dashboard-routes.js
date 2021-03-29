const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Meeting, Participant } = require("../models");
const withAuth = require("../utils/auth");

// FIND ALL the meetings for the logged-in user
// INCLUDE the users who are invited to that meeting
// called with get /dashboard/

router.get("/", withAuth, (req, res) => {
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
        attributes: ["date", "start", "end", "meeting_name", "topic"],
      },
    ],
  })
    // Maps the meeting data and returns the participant data
    .then((dbData) => {
      var myArray = dbData
        .map((element, i) => {
          var participantArray = {
            date: element.dataValues.meeting.date,
            start: element.dataValues.meeting.start,
            end: element.dataValues.meeting.end,
            meeting_name: element.dataValues.meeting.meeting_name,
            topic: element.dataValues.meeting.topic,
          };
          return participantArray;
        })
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    })
    // Finds meeting data based on the organizer id.
    .then((dbData) => {
      console.log("&&&&&&&&&&&&&&&&&&&&");
      Meeting.findAll({
        where: {
          organizer_id: req.session.user_id,
        },
        attributes: ["date", "start", "end", "meeting_name", "topic"],
      })
        .then((dbData2) => {
          var myArray2 = dbData2.map((element, i) => {
            var meetingArray2 = {
              date: element.dataValues.date,
              start: element.dataValues.start,
              end: element.dataValues.end,
              meeting_name: element.dataValues.meeting_name,
              topic: element.dataValues.topic
            };
            return meetingArray2;
          });
          res.render("dashboard", {
            participantObj: myArray1,
            meetingObj: myArray2,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });
});

// LOADS THE ADD-MEETING PAGE with a form for
// submitting the new meeting.

router.get("/add-meeting/", withAuth, (req, res) => {
  res.render("add-meeting", {
    loggedIn: true,
  });
});

module.exports = router;
