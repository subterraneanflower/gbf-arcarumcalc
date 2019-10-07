export const dateToEpoch = (year: number, month: number, day: number): number => {
  return new Date(year, month - 1, day).getTime();
};
