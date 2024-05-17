import { deburr } from 'lodash';

export class GenerateCode {
  private code: number;

  constructor(code: number) {
    this.code = code;
  }

  static generateRandomSixDigitNumber(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateId(userId: number, name: string): string {
    // Chuyển tên sản phẩm thành chuỗi không dấu và chữ thường
    const formattedName = this.removeAccents(name)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');

    // Tạo chuỗi ngẫu nhiên gồm 5 ký tự và số
    const randomString = this.generateRandomString(5);

    return `${userId}-${formattedName}-${randomString}`;
  }

  static removeAccents(str: string): string {
    const accentsMap = new Map([
      ['a', 'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ'],
      ['A', 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ'],
      ['d', 'đ'],
      ['D', 'Đ'],
      ['e', 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ'],
      ['E', 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ'],
      ['i', 'í|ì|ỉ|ĩ|ị'],
      ['I', 'Í|Ì|Ỉ|Ĩ|Ị'],
      ['o', 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ'],
      ['O', 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ'],
      ['u', 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự'],
      ['U', 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự'],
      ['y', 'ý|ỳ|ỷ|ỹ|ỵ'],
      ['Y', 'Ý|Ỳ|Ỷ|Ỹ|Ỵ'],
    ]);

    for (let [key, value] of accentsMap) {
      str = str.replace(new RegExp(value, 'g'), key);
    }

    return str;
  }

  private static generateRandomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
