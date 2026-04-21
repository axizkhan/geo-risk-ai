import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

type ValidationSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function reqValidatorFunc(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // const result = schema.safeParse(req.body);

    let result;

    for (let field in schema) {
      switch (field) {
        case "body":
          result = schema[field]?.safeParse(req.body);

          break;
        case "params":
          result = schema[field]?.safeParse(req.params);
          break;
        case "query":
          result = schema[field]?.safeParse(req.query);
          break;
      }

      if (result) {
        if (!result.success) {
          return res.status(400).json({
            error: result.error.issues,
          });
        }
        // @ts-ignore
        req.validatedData[field] = result.data;
        continue;
      }
      throw new InternalServerError({
        appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
        errorType: ERROR_TYPE.SYSTEM,
        message: "Validation middleware error",
      });
    }

    next();
  };
}
