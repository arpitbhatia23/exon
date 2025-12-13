class apiResponse {
  public statusCode: number;
  public data: any;
  public message: string;
  public success: boolean;
  constructor(statusCode: number, data: any, message: string = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
export { apiResponse };
