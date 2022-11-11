'use strict';
import * as allCodeMigration from '../migrations/create-allcode-migration';
const { tableInfo, handleColTypes } = allCodeMigration;
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      Allcode.hasMany(models.users, {
        foreignKey: 'positionId',
        as: 'positionData',
      });
      Allcode.hasMany(models.users, {
        foreignKey: 'gender',
        as: 'genderData',
      });
      Allcode.hasMany(models.schedules, {
        foreignKey: 'timeType',
        as: 'timeTypeData',
      });
      Allcode.hasMany(models.doctor_infors, {
        foreignKey: 'priceId',
        as: 'priceData', //42ms39ss
      });
      Allcode.hasMany(models.doctor_infors, {
        foreignKey: 'provinceId',
        as: 'provinceData', //42ms39ss
      });
      Allcode.hasMany(models.doctor_infors, {
        foreignKey: 'paymentId',
        as: 'paymentData', //42ms39ss
      });
    }
  }

  const colsTypes = handleColTypes(DataTypes, false);

  Allcode.init(
    {
      ...colsTypes,
    },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return Allcode;
};
