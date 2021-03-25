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
    meeting_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'request',
        key: 'id'
      }
    },
    
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
