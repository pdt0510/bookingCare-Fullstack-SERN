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
    static associate(models) {}
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
