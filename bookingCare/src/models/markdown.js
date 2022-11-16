'use strict';
import * as migrationInfo from '../migrations/create-markdown-migration';
const { tableInfo, handleColTypes } = migrationInfo;
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Markdown.belongsTo(models.users, {
        foreignKey: 'doctorId',
        as: 'doctorMarkdown',
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
