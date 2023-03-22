// import moment from 'moment';

const formatDate = date => {
  // console.log('date', date);
  // console.log(moment(date).format('MM/DD/YYYY'));
  // return moment(date).format('MM/DD/YYYY');
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  console.log(month, day, year);

  return `${month}/${day}/${year}`;
};
export default formatDate;
