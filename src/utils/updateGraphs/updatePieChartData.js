import makeRequest from '../makeRequest';
import { GET_ENGAGEMENT_STATUS_MONTHLY } from '../../constants/apiEndpoints';
const updatePieChartData = (
  newCategories,
  setEngagementStatusData,
  setUserStatusData,
  numberOfPeopleStaffed,
  selectedMonth,
  setStaffingPercentage,
  setCurrentMonth
) => {
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthIndex = newCategories.indexOf(selectedMonth);
  const index = allMonths.indexOf(selectedMonth);
  let dateString = '';
  if (index < month) {
    dateString = `${year}-${index + 1}-${1}`;
    setCurrentMonth(`${new Date(dateString).toLocaleString('default', { month: 'long' })} ${year}`);
  } else {
    dateString = `${year - 1}-${index + 1}-${1}`;
    setCurrentMonth(`${new Date(dateString).toLocaleString('default', { month: 'long' })} ${year - 1}`);
  }
  makeRequest(GET_ENGAGEMENT_STATUS_MONTHLY, { data: { startDate: dateString } })
    .then(res => {
      let ongoing = 0;
      let completed = 0;
      let upcoming = 0;
      res.map(item => {
        if (item.status === 'ongoing') {
          ongoing++;
        } else if (item.status === 'completed') {
          completed++;
        } else if (item.status === 'upcoming') {
          upcoming++;
        }
        const statusData = [
          { name: 'ongoing', y: ongoing },
          { name: 'completed', y: completed },
          { name: 'upcoming', y: upcoming },
        ];
        const staffed = numberOfPeopleStaffed[monthIndex];
        const userStatusData = [
          { name: 'Beach', y: 100 - staffed },
          { name: 'Staffed', y: staffed },
        ];
        setStaffingPercentage(staffed);
        setEngagementStatusData(statusData);
        setUserStatusData(userStatusData);
      });
    })
    .catch(err => console.log(err));
};
export default updatePieChartData;
