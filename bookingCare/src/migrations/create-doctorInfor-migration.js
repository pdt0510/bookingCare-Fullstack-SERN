'use strict';
const types = {
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  INTEGER: 'INTEGER',
  DATE: 'DATE',
  TEXT: 'TEXT',
  TEXTLONG: 'TEXTLONG',
};

//src24, 10ms47ss
const tableInfo = {
  tableName: 'doctor_infors',
  keyValueCols: [
    `doctorId-${types.INTEGER}`,
    `priceId-${types.STRING}`,
    `provinceId-${types.STRING}`,
    `paymentId-${types.STRING}`,
    `clinicAddress-${types.STRING}`,
    `clinicName-${types.STRING}`,
    `note-${types.TEXT}`,
    `count-${types.INTEGER}`,
  ],
};

const handleColTypes = (colTypeList, sequelizeList = true) => {
  let result = {};
  if (sequelizeList) {
    tableInfo.keyValueCols.forEach((element) => {
      const keys = element.split('-');
      const [colName, colType] = keys;

      if (colType === types.STRING) {
        result[colName] = {
          type: colTypeList.STRING,
          allowNull: false,
        };
      } else if (colType === types.INTEGER) {
        result[colName] = {
          type: colTypeList.INTEGER,
          allowNull: false,
          defaultValue: colName === 'count' ? 0 : colTypeList.INTEGER, //19ms13ss
        };
      } else if (colType === types.BOOLEAN) {
        result[colName] = { type: colTypeList.BOOLEAN };
      } else if (colType === types.DATE) {
        result[colName] = { type: colTypeList.DATE };
      } else if (colType === types.TEXT) {
        result[colName] = { type: colTypeList.TEXT };
      } else if (colType === types.TEXTLONG) {
        result[colName] = { type: colTypeList.TEXT('long') };
      }
    });
  } else {
    tableInfo.keyValueCols.forEach((element) => {
      const keys = element.split('-');
      const [colName, colType] = keys;

      if (colType === types.STRING) {
        result[colName] = colTypeList.STRING;
      } else if (colType === types.INTEGER) {
        result[colName] = colTypeList.INTEGER;
      } else if (colType === types.BOOLEAN) {
        result[colName] = colTypeList.BOOLEAN;
      } else if (colType === types.DATE) {
        result[colName] = colTypeList.DATE;
      } else if (colType === types.TEXT) {
        result[colName] = colTypeList.TEXT;
      } else if (colType === types.TEXTLONG) {
        result[colName] = colTypeList.TEXT('long');
      }
    });
  }
  return result;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const colsTypes = handleColTypes(Sequelize);

    await queryInterface.createTable(`${tableInfo.tableName}`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ...colsTypes,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(`${tableInfo.tableName}`);
  },
  tableInfo,
  handleColTypes,
};