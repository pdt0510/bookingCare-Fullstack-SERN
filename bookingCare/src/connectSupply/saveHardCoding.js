// saving code for a auto checking
const types = {
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  INTEGER: 'INTEGER',
  DATE: 'DATE',
  TEXT: 'TEXT',
};

const tablesName = {
  users: 'users',
};

const tableInfo = {
  tableName: 'USERS',
  keyValueCols: [
    `email-${types.STRING}`,
    `password-${types.STRING}`,
    `firstName-${types.STRING}`,
    `lastName-${types.STRING}`,
    `address-${types.STRING}`,
    `gender-${types.BOOLEAN}`,
    `typeRole-${types.STRING}`,
    `keyRole-${types.STRING}`,
  ],
};

const handleColTypes = (colTypeList, sequelizeList = true) => {
  let result = {};
  if (sequelizeList) {
    tableInfo.keyValueCols.forEach((element) => {
      const keys = element.split('-');
      if (element.includes(types.STRING)) {
        result[keys[0]] = { type: colTypeList.STRING };
      } else if (element.includes(types.INTEGER)) {
        result[keys[0]] = { type: colTypeList.INTEGER };
      } else if (element.includes(types.BOOLEAN)) {
        result[keys[0]] = { type: colTypeList.BOOLEAN };
      } else if (element.includes(types.DATE)) {
        result[keys[0]] = { type: colTypeList.DATE };
      } else if (element.includes(types.TEXT)) {
        result[keys[0]] = { type: colTypeList.TEXT };
      }
    });
  } else {
    tableInfo.keyValueCols.forEach((element) => {
      const keys = element.split('-');
      if (element.includes(types.STRING)) {
        result[keys[0]] = colTypeList.STRING;
      } else if (element.includes(types.INTEGER)) {
        result[keys[0]] = colTypeList.INTEGER;
      } else if (element.includes(types.BOOLEAN)) {
        result[keys[0]] = colTypeList.BOOLEAN;
      } else if (element.includes(types.DATE)) {
        result[keys[0]] = colTypeList.DATE;
      } else if (element.includes(types.TEXT)) {
        result[keys[0]] = colTypeList.TEXT;
      }
    });
  }
  return result;
};
