import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { schema } from "../validation/user.validation";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isBodyValid(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IUser;
      const valid = schema.validate(body);

      if (valid.error) {
        throw new ApiError(`${valid.error}`, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
