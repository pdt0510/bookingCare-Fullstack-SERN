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
      /* 
      display a associate
     */
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
