import { dateValidatorFunc } from "@repo/shared";

export const dashboardDatesValidateFunc = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): { success: boolean; message: string; error?: string } => {
  let isstartdateValid: boolean = dateValidatorFunc(startDate);
  let isenddateValid: boolean = dateValidatorFunc(endDate);

  if (isstartdateValid && isenddateValid) {
    return { success: true, message: "dates are valids" };
  }

  return {
    success: false,
    message: "dates are invalid",
    error: !isenddateValid
      ? "end Date is in invalid formate"
      : !isstartdateValid
        ? "start date is in invalid formate"
        : "start and end date both are in invalid formate",
  };
};
