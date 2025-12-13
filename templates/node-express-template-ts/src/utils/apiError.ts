interface options {
  statusCode: number;
}

class apiError extends Error {
  public statuscode: number;
  public data: any;
  public success: boolean;
  public errors: any[];
  constructor(
    statuscode: number,
    message: string = "something went wrong",
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statuscode = statuscode;
    this.data = null;
    this.message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { apiError };
