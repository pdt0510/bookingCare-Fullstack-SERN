'use strict';
import * as migrationInfo from '../migrations/create-doctorInfor-migration';
const { tableInfo, handleColTypes } = migrationInfo;
const { Model } = require('sequelize');

//src24, 10ms47ss
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
        as: 'priceData', // 42ms39ss
      });
      DoctorInfor.belongsTo(models.allcodes, {
        foreignKey: 'provinceId',
        targetKey: 'keymap',
        as: 'provinceData', // 42ms39ss
      });
      DoctorInfor.belongsTo(models.allcodes, {
        foreignKey: 'paymentId',
        targetKey: 'keymap',
        as: 'paymentData', // 42ms39ss
      });
      DoctorInfor.belongsTo(models.users, {
        foreignKey: 'doctorId',
        as: 'doctorInfo', //v89xx1
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
