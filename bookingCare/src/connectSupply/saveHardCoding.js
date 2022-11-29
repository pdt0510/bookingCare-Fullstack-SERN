const types = {
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  INTEGER: 'INTEGER',
  DATE: 'DATE',
  TEXT: 'TEXT',
  TEXTLONG: 'TEXTLONG',
  BLOBmedium: `BLOBmedium`,
};

const tableInfo = {
  tableName: 'tableName',
  keyValueCols: [
    `contentHTML-${types.TEXTLONG}`,
    `contentMarkdown-${types.TEXTLONG}`,
    `description-${types.TEXTLONG}`,
    `doctorId-${types.INTEGER}`,
    `specialityId-${types.INTEGER}`,
    `clinicId-${types.INTEGER}`,
    `image-${types.BLOBmedium}`,
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
      } else if (element.includes(types.BLOBmedium)) {
        result[keys[0]] = { type: colTypeList.BLOB('medium') };
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
      } else if (element.includes(types.BLOBmedium)) {
        result[keys[0]] = colTypeList.BLOB('medium');
      }
    });
  }
  return result;
};
