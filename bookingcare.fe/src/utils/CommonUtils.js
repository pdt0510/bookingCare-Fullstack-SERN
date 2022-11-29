import moment from 'moment';
import { dateFormat } from './constant';

class CommonUtils {
  static isNumber1(number) {
    if (number === 1) return true;
    return false;
  }

  static convertBlobToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static convertBase64ToBinary(base64Str) {
    return new Buffer.from(base64Str).toString('binary');
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

  static convertObjDateTo_DMY_str = (date) => {
    if (date) {
      return moment(date).format(dateFormat.DMY);
    }
    return null;
  };

  static convertObjDateTo_dDM_str = (date) => {
    if (date) {
      return moment(date).format(dateFormat.dDM);
    }
    return null;
  };

  static convertStrDateToTimestamp = (strDate) => {
    if (strDate) {
      const test = moment(strDate, 'DD/MM/YYYY');
      return Date.parse(test);
    }
    return null;
  };

  static convertTimestampToDateObj = (date) => {
    if (date) {
      return new Date(date);
    }
    return null;
  };
}

export default CommonUtils;
