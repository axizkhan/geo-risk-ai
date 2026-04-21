export const dateValidatorFunc = (dateString: string) =>
  !isNaN(Date.parse(dateString));
