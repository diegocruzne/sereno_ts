import { NextFunction, Response } from "express";
import { CustomRequest } from "../data/mysql/interfaces/custom-request.interface";
import { validationResult } from "express-validator";

export const expressValidatorAdapter = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};
