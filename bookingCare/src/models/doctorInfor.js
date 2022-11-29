'use strict';
import * as migrationInfo from '../migrations/create-doctorInfor-migration';
const { tableInfo, handleColTypes } = migrationInfo;
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DoctorInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      DoctorInfor.belongsTo(models.allcodes, {
        foreignKey: 'priceId',
        targetKey: 'keymap',
        as: 'priceData',
      });
      DoctorInfor.belongsTo(models.allcodes, {
        foreignKey: 'provinceId',
        targetKey: 'keymap',
        as: 'provinceData',
      });
      DoctorInfor.belongsTo(models.allcodes, {
        foreignKey: 'paymentId',
        targetKey: 'keymap',
        as: 'paymentData',
      });
      DoctorInfor.belongsTo(models.specialities, {
        foreignKey: 'specialityId', //v101xx3
        as: 'specialityData',
      });
    }
  }
  const colsTypes = handleColTypes(DataTypes, false);

  DoctorInfor.init(
    {
      ...colsTypes,
    },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return DoctorInfor;
};
