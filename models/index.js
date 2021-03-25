// import all models
const User = require('./User');
const Request = require('./Request')
const Attendee = require('./Attendee')


// create associations
User.hasMany(Request, {
  foreignKey: 'user_id'
});

Request.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});


Request.hasMany(Attendee, {
  foreignKey: 'meeting_id'
});

Attendee.belongsTo(Request, {
  foreignKey: 'meeting_id',
  onDelete: 'SET NULL'
});








module.exports = { User, Request, Attendee  };
