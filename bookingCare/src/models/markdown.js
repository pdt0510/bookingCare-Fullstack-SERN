'use strict';
import * as migrationInfo from '../migrations/create-markdown-migration';
const { tableInfo, handleColTypes } = migrationInfo;
const { Model } = require('sequelize');

//src20, 35ms35ss
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //34ms50ss, v77xx1
      Markdown.belongsTo(models.users, {
        foreignKey: 'doctorId',
        // as: 'doctorInfo',
      });
    }
  }

  const colsTypes = handleColTypes(DataTypes, false);
  Markdown.init(
    { ...colsTypes },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return Markdown;
};
