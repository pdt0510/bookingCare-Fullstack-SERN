import moment from 'moment';
import { dateFormat, LANGUAGES } from './constant';

class CommonUtils {
  static convertFileToImgBlobUrl(fileObj) {
    return URL.createObjectURL(fileObj);
  }

  static convertFileToString(fileObj) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static convertBinaryToString(binaryObj) {
    return new Buffer.from(binaryObj).toString();
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

  static convertObjDateTo_DMYstr = (date) => {
    if (date) {
      return moment(date).format(dateFormat.DMY);
    }
    return null;
  };

  static convertObjDateTo_dDMstr = (date) => {
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

  // v108xx6
  static convertTimestampTo_dDMstr = (timestamp) => {
    if (timestamp) {
      return moment(timestamp).format(dateFormat.dDM);
    }
    return null;
  };

  // v108xx6
  static convertTimestampTo_DMYstr = (timestamp) => {
    if (timestamp) {
      return moment(timestamp).format(dateFormat.DMY);
    }
    return null;
  };

  static convertHtmlStrToText = (htmlStr) => {
    if (htmlStr) {
      return <span dangerouslySetInnerHTML={{ __html: htmlStr }} />;
    }
    return <span>No content</span>;
  };

  static switchLangLocally = (language) => {
    const { weekdaysVI, weekdaysEN } = dateFormat;
    if (language === LANGUAGES.EN) {
      return moment.updateLocale(LANGUAGES.EN, { weekdays: weekdaysEN });
    } else {
      return moment.updateLocale(LANGUAGES.VI, { weekdays: weekdaysVI });
    }
  };
}

export default CommonUtils;
