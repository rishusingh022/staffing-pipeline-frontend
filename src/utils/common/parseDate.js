export default function parseDate(date) {
  const dateArr = date.split('/');
  // remove leading zeros from dateArr elements
  const year = dateArr[2];
  const month = dateArr[0];
  const day = dateArr[1];
  // return parsedDate;
  return `${year}-${month}-${day}T18:30:00.000Z`;
  // return new Date(year, month, day).toISOString();
}
