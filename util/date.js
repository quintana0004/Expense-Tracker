import { format, isWithinInterval } from "date-fns";

export function getFormattedDate(date) {
  console.log("Date of item: ", date);
  return date.toISOString().slice(0, 10);
}

//`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function getStringFormatDate(date) {
  const modifiedDate = date.split("-");

  return format(
    new Date(+modifiedDate[0], +modifiedDate[1] - 1, +modifiedDate[2]),
    "EEEE,  LLLL dd, yyyy"
  );
}

export function checkifWithinRangeDate(startDate, lastDate, currentDate) {
  const modCurrentDate = currentDate.split("-");
  const modStartDate = startDate.split("-");
  const modLastDate = lastDate.split("-");

  return isWithinInterval(
    new Date(+modCurrentDate[0], +modCurrentDate[1] - 1, +modCurrentDate[2]),
    {
      start: new Date(+modStartDate[0], +modStartDate[1] - 1, +modStartDate[2]),
      end: new Date(+modLastDate[0], +modLastDate[1] - 1, +modLastDate[2]),
    }
  );
}
