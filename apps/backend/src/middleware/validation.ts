import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

type fieldCheck = "body" | "params" | "query";

export function reqValidatorFunc(
  schema: ZodType,
  fieldCheck: fieldCheck = "body",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    // const result = schema.safeParse(req.body);

    let result;

    switch (fieldCheck) {
      case "body":
        result = schema.safeParse(req.body);
        break;
      case "params":
        result = schema.safeParse(req.params);
        break;
      case "query":
        result = schema.safeParse(req.query);
        break;
    }

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues,
      });
    }
    req.validatedData = result.data;

    next();
  };
}
