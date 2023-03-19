/* eslint-disable indent */
export const timeFilterUtil = timeFrameSelected => {
  let startDate = new Date();
  let endDate = new Date();
  switch (timeFrameSelected) {
    case 'Today':
      startDate = new Date();
      endDate = new Date();
      break;
    case 'This week':
      startDate = new Date();
      endDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay());
      endDate.setDate(endDate.getDate() - endDate.getDay() + 6);
      break;
    case 'This month':
      startDate = new Date();
      endDate = new Date();
      startDate.setDate(1);
      endDate.setDate(endDate.getDate() - endDate.getDay() + 6);
      break;
    case 'Last 6 months':
      startDate = new Date();
      endDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);
      break;
    case 'Last 12 months':
      startDate = new Date();
      endDate = new Date();
      startDate.setMonth(startDate.getMonth() - 12);
      break;
    case 'Last 5 Years':
      startDate = new Date();
      endDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 5);
      break;
    case 'All':
      startDate = new Date('1970-01-01');
      endDate = new Date();
      break;
    default:
      startDate = new Date();
      endDate = new Date();
      break;
  }
  return { startDate, endDate };
};
