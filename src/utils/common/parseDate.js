export default function parseDate(date) {
  const dateArr = date.split('/');
  // remove leading zeros from dateArr elements
  const year = dateArr[2] ? dateArr[2] : '';
  const month = dateArr[0] ? dateArr[0] : '';
  const day = dateArr[1] ? dateArr[1] : '';
  // return parsedDate;
  const newDate = new Date(year, month, day, 0, 0, 0);
  return newDate.toISOString();
  // return new Date(year, month, day).toISOString();
}
