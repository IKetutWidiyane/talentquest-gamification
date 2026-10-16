
import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class AppError extends Error {
  statusCode: number;
  code?: string;

  constructor(
    message: string,
    statusCode = 500,
    code?: string
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(
    new AppError(
      `Route ${req.method} ${req.originalUrl} not found`,
      404,
      "ROUTE_NOT_FOUND"
    )
  );
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal server error";
  let code = "INTERNAL_SERVER_ERROR";
  let details: unknown;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code ?? "APP_ERROR";
  } else if (error instanceof ZodError) {
    statusCode = 400;
    message = "Request validation failed";
    code = "VALIDATION_ERROR";
    details = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    switch (error.code) {
      case "P2002":
        statusCode = 409;
        message = "A record with this value already exists";
        code = "DUPLICATE_RECORD";
        break;

      case "P2003":
        statusCode = 409;
        message = "The operation conflicts with related records";
        code = "RELATION_CONFLICT";
        break;

      case "P2025":
        statusCode = 404;
        message = "Record not found";
        code = "RECORD_NOT_FOUND";
        break;

      default:
        statusCode = 500;
        message = "Database operation failed";
        code = "DATABASE_ERROR";
    }
  } else if (error instanceof SyntaxError && "body" in error) {
    statusCode = 400;
    message = "Invalid JSON request body";
    code = "INVALID_JSON";
  }

  if (statusCode >= 500) {
    console.error("Unhandled API error:", error);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      ...(details ? { details } : {}),
    },
  });
};
