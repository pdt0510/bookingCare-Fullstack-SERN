'use strict';
import * as migrationInfo from '../migrations/create-doctor_clinic_specialty-migration';
const { tableInfo, handleColTypes } = migrationInfo;

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinic_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  const colsTypes = handleColTypes(DataTypes, false);

  Doctor_Clinic_Specialty.init(
    {
      ...colsTypes,
    },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return Doctor_Clinic_Specialty;
};
