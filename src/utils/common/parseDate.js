export default function parseDate(date) {
  console.log(date);

  const dateArr = date.split('-').length === 3 ? date.split('-') : date.split('/');
  // remove leading zeros from dateArr elements
  const year = dateArr[0] ? dateArr[0] : '';
  const month = dateArr[1] ? dateArr[1] : '';
  const day = dateArr[2] ? dateArr[2] : '';
  // return parsedDate;

  const newDate = new Date(year, month - 1, day, 0, 0, 0);
  console.log(newDate);
  return newDate.toISOString();
  // return new Date(year, month, day).toISOString();
}
