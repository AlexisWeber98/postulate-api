import { Logger } from "./logger.js";

export class CustomError extends Error {
  constructor(
    public message: string,
    public status: number,
    public code: string,
  ) {
    super(message);
    Logger.error(message, this, {
      status,
      code,
      stack: this.stack,
    });
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string) {
    super(message, 500, "DATABASE_ERROR");
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message, 401, "AUTENTICATION_ERROR");
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404, "NOT_FOUND_ERROR");
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403, "FORBIDDEN_ERROR");
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409, "CONFLICT_ERROR");
  }
}
