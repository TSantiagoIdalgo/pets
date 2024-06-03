type Reason = Record<string, string>;

export default class ErrorHandler extends Error {
  code: number;
  override message: string;
  data: Reason | undefined;
  constructor(statusCode: number, message: string, reason?: Reason) {
    super();
    this.code = statusCode;
    this.message = message;
    this.data = reason;
  }
}
