import moment from 'moment';
import { dateFormat } from './constant';

class CommonUtils {
  static isNumber1(number) {
    if (number === 1) return true;
    return false;
  }

  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // 26ms18ss
  static formatCurrency = (priceId, priceList) => {
    const priceLength = priceList.length;

    for (let idx = 0; idx < priceLength; idx++) {
      let viCurrency = null;
      let dollarCurrency = null;

      if (priceList[idx].keymap === priceId) {
        dollarCurrency = `${priceList[idx].valueEN}`;
        viCurrency = `${priceList[idx].valueVI.slice(0, 3)}.000`;
        return { viCurrency, dollarCurrency };
      }
    }
  };

  static convertDateToDD_MM_YYYY = (date) => {
    if (date) {
      return moment(date).format(dateFormat.DD_MM_YYYY);
    }
    return null;
  };

  static converStrToDateBydd_DD_MM = (strDate) => {
    if (strDate) {
      return moment(strDate, dateFormat.dd_DD_MM);
    }
    return null;
  };

  static convertDateToTimestamp = (date) => {
    if (date) {
      return Date.parse(date);
    }
    return null;
  };

  static convertTimestampToDate = (date) => {
    if (date) {
      return new Date(date);
    }
    return null;
  };
}

export default CommonUtils;
