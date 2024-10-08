import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

class FileMiddleware {
  public isFileValid(expectedType: string, maxSize: number) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const avatar = req.files.avatar as UploadedFile;
        if (!avatar) {
          return res.status(400).send({ message: "No file uploaded" });
        }

        if (
          avatar.mimetype.trim().toLowerCase() !==
          expectedType.trim().toLowerCase()
        ) {
          return res.status(400).send({ message: "Invalid file type" });
        }

        if (avatar.size > maxSize) {
          return res.status(400).send({
            message: `File size exceeds the limit of ${maxSize / (1024 * 1024)} MB`,
          });
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
