'use strict';
import * as migrationInfo from '../migrations/create-clinic-migration';
const { tableInfo, handleColTypes } = migrationInfo;

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.hasMany(models.doctor_infors, {
        foreignKey: 'clinicId', //v106xx1
        as: 'clinicData',
      });
    }
  }

  const colsTypes = handleColTypes(DataTypes, false);
  Clinic.init(
    { ...colsTypes },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return Clinic;
};
