export enum ErrorType {
  Error = "Error",
  Type = "TypeError",
  Eval = "EvalError",
  Range = "RangeError",
  Null = "NullError",
  Value = "ValueError",
  Syntax = "SyntaxError",
}

export class ErrorHandler extends Error {
  type: ErrorType;
  prefix: string;

  constructor(prefix: string, message: string, type: ErrorType) {
    super(`[${prefix}] ${type}: ${message}`);

    this.prefix = prefix;
    this.type = type;
    this.name = type; // important for stack trace readability

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }
}
