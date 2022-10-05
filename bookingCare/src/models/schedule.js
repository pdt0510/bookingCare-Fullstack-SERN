'use strict';
import * as migrationInfo from '../migrations/create-schedule-migration';
const { tableInfo, handleColTypes } = migrationInfo;

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  const colsTypes = handleColTypes(DataTypes, false);

  Schedule.init(
    {
      ...colsTypes,
    },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return Schedule;
};
