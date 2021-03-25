// import all models
const User = require('./User');
const Meeting = require('./Meeting')
const Participant = require('./Participant')


// first two are organizer 
// if user is deleted it will the meeting user to null
// commenting out the ability to organize more than
// one meeting per user
// User.hasMany(Meeting, {
//   foreignKey: 'organizer_id',
// });

Meeting.belongsTo(User, {
  foreignKey: 'organizer_id',
});

////////////////
User.belongsToMany(Meeting, {
  through: Participant,
  foreignKey: 'user_id',
});

Meeting.belongsToMany(User, {
  through: Participant,
  foreignKey: 'meeting_id',
});






module.exports = { User, Meeting, Participant  };
