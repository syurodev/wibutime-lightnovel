export class GenerateId {
  static generateId(userId: number, name: string): string {
    // Chuyển tên sản phẩm thành chuỗi không dấu và chữ thường
    const formattedName = name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');

    // Tạo chuỗi ngẫu nhiên gồm 5 ký tự và số
    const randomString = this.generateRandomString(5);

    return `${userId}-${formattedName}-${randomString}`;
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
