const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Request extends Model{}

// create fields/columns for Request model
Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    organizer: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    invitees: {
      type: DataTypes.STRING,
      references: {
        model: 'attendee',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'request'
  }
);

module.exports = Request;
