import { NextFunction, Request, Response } from "express";
import { HttpException, ErrorCode } from "../exceptions/root";

export const errorMiddleware = (
  error: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    error instanceof HttpException && error.statusCode
      ? error.statusCode
      : 500; 

  const errorCode =
    error instanceof HttpException && error.errorCode
      ? error.errorCode
      : ErrorCode.INTERNAL_EXCEPTION;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    errorCode,
    errors: error instanceof HttpException ? error.errors : null,
  });
};
