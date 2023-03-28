// import moment from 'moment';

export const formatDate = date => {
  // console.log('date', date);
  // console.log(moment(date).format('MM/DD/YYYY'));
  // return moment(date).format('MM/DD/YYYY');
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${month}/${day}/${year}`;
};
export const dateFormater = date => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return `${year}-${month < 10 ? '0' + month.toString() : month}-${day < 10 ? '0' + day.toString() : day}`;
};
