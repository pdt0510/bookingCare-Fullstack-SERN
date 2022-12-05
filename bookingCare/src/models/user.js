'use strict';
import * as migrationInfo from '../migrations/create-user-migration.js';
const { tableInfo, handleColTypes } = migrationInfo;
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      User.belongsTo(models.allcodes, {
        foreignKey: 'positionId',
        targetKey: 'keymap',
        as: 'positionData',
      });
      User.belongsTo(models.allcodes, {
        foreignKey: 'gender',
        targetKey: 'keymap',
        as: 'genderData',
      });
      User.hasOne(models.markdowns, {
        foreignKey: 'doctorId',
        as: 'doctorMarkdown',
      });
      User.hasMany(models.bookings, {
        foreignKey: 'doctorId', //v107xx2
        as: 'bookingData',
      });
      User.hasMany(models.bookings, {
        foreignKey: 'patientId', //v108xx2
        as: 'patientInfoData',
      });
    }
  }
  const colsTypes = handleColTypes(DataTypes, false);

  User.init(
    {
      ...colsTypes,
    },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return User;
};
