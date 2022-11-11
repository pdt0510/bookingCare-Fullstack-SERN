// saving code for a auto checking
const types = {
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  INTEGER: 'INTEGER',
  DATE: 'DATE',
  TEXT: 'TEXT',
  TEXTLONG: 'TEXTLONG',
};

const tableInfo = {
  tableName: 'markdowns',
  keyValueCols: [
    `contentHTML-${types.TEXTLONG}`,
    `contentMarkdown-${types.TEXTLONG}`,
    `description-${types.TEXTLONG}`,
    `doctorId-${types.INTEGER}`,
    `specialityId-${types.INTEGER}`,
    `clinicId-${types.INTEGER}`,
  ],
};

const handleColTypes = (colTypeList, sequelizeList = true) => {
  let result = {};
  if (sequelizeList) {
    tableInfo.keyValueCols.forEach((element) => {
      const keys = element.split('-');
      const [colName, colType] = keys;

      if (colType === types.STRING) {
        result[colName] = { type: colTypeList.STRING };
      } else if (colType === types.INTEGER) {
        result[colName] = { type: colTypeList.INTEGER };
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
