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

    return null;
  };

  // v96xx1
  static convertObjDateTo_DMY_str = (date) => {
    if (date) {
      // return moment(date, dateFormat.DMY); //return 1 obj
      return moment(date).format(dateFormat.DMY); //return 1 string
    }
    return null;
  };

  static convertObjDateTo_dDM_str = (date) => {
    if (date) {
      return moment(date).format(dateFormat.dDM);
    }
    return null;
  };

  //timestamp without hh-mm-ss
  static convertStrDateToTimestamp = (strDate) => {
    if (strDate) {
      const test = moment(strDate, 'DD/MM/YYYY');
      return Date.parse(test);
    }
    return null;
  };

  //date without hh-mm-ss
  static convertTimestampToDateObj = (date) => {
    if (date) {
      return new Date(date); //return object
    }
    return null;
  };
}

export default CommonUtils;
