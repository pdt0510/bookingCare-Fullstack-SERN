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
    static associate(models) {}
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
