import { ErrorResponse } from 'src/protos/lightnovel/lightnovel';

export class ResponseData<T> {
  public error: ErrorResponse | null;
  public success: T | null;

  constructor() {
    this.error = null;
    this.success = null;
  }

  public getMessage(): string {
    return this.error ? this.error.message : '';
  }

  public setMessage(message: string): void {
    if (!this.error) {
      this.error = { message: message };
      this.success = null;
    } else {
      this.error.message = message;
    }
  }

  public getData(): { error: ErrorResponse | null; success: T | null } {
    return {
      error: this.error,
      success: this.success,
    };
  }

  public setData(data: T): void {
    this.success = data;
    this.error = null;
  }

  public autoGenerateResponse(data: T | null, message?: string): void {
    if (data !== null && data !== undefined) {
      this.success = data;
      this.error = null;
    } else {
      this.error = { message: message ?? 'Lỗi' };
      this.success = null;
    }
  }
}
