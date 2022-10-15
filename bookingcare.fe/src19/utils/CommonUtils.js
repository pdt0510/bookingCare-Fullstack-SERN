class CommonUtils {
  static isNumber1(number) {
    if (number === 1) return true;
    return false;
  }

  // 19ms09ss
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export default CommonUtils;
