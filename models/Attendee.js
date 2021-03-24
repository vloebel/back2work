const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Attendee extends Model{}

// create fields/columns for Request model
// points to request, the requested attendee, 
// and says whether or not it's accepted
//one meeting request will have many attendees
//Attendees can be assigned to multiple mtgs.
// but not at the same time, so they are unique per request
Attendee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    request_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'request',
        key: 'id'
      }
    },
    // vll: I don't think this is a fk on user-
    // it is a reference to that table, but it
    // doesn't BELONG to it. (?)
    // BUT is there a way to put the constraint?
    // removed:
      // references: {
      //   model: 'users',
      //   key: 'id'
      // }
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'attendee'
  }
);

module.exports = Attendee;
