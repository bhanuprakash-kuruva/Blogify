import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ErrorCode } from "./exceptions/root";

const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      console.log("Error caught in errorHandler:", error); // Add this
      
      let exception: HttpException;

      if (error instanceof HttpException) {
        exception = error;
      }
      else if (error instanceof ZodError) {
        console.log("ZodError details:", error.issues); // Add this
        exception = new HttpException(
          "Validation failed",
          ErrorCode.UNPROCESSABLE_ENTITY,
          422,
          error.issues
        );
      }
      else {
        console.log("Unknown error:", error); // Add this
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }

      next(exception);
    }
  };
};

export default errorHandler;
