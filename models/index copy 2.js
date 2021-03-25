// import all models
const User = require('./User');
const Meeting = require('./Meeting')
const Participant = require('./Participant')


// first two are organizer 
User.hasMany(Meeting, {
  foreignKey: 'organizer_id',
});

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
////////////////////////////
// vll: getting problems with fk on adding meeting,
// so modeling all the rest of these after our challenge
// last week even though TJ said we shoudn't
// need them

Participant.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.hasMany(Participant, {
  foreignKey: 'user_id'
});

Participant.belongsTo(Meeting, {
  foreignKey: 'meeting_id',
  onDelete: 'SET NULL'
});

Meeting.hasMany(Participant, {
  foreignKey: 'meeting_id'
});

module.exports = { User, Meeting, Participant  };
