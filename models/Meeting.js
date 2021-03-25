const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Meeting extends Model{}

// create fields/columns for meeting model
// points to the employee who requsted the mtg
// one employee can have many meetings. each
//meeting belongs to ONE employee
Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // vll:sequelize type would be DATEONLY 
    // but we might want to use MWTRF if
    // there's no linked calendar
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
 
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meeting'
  }
  );

module.exports = Meeting;
