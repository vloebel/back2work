// import all models
const User = require('./User');
const Meeting = require('./Meeting')
const Participant = require('./Participant')


//// copied this index file which wasn't working
// and deleted everything wondering if sequelize
// will take care of it

module.exports = { User, Meeting, Participant  };
