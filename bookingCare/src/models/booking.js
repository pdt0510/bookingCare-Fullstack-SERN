'use strict';
import * as migrationInfo from '../migrations/create-booking-migration';
const { tableInfo, handleColTypes } = migrationInfo;

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.users, {
        foreignKey: 'doctorId', //v107xx2
        as: 'bookingData',
      });
      Booking.belongsTo(models.users, {
        foreignKey: 'patientId', //v108xx2
        as: 'patientInfoData',
      });
      Booking.belongsTo(models.allcodes, {
        foreignKey: 'timeType',
        targetKey: 'keymap',
        as: 'timeTypeBookedData', //v108xx4
      });
    }
  }

  const colsTypes = handleColTypes(DataTypes, false);
  Booking.init(
    { ...colsTypes },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return Booking;
};
