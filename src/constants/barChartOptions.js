import Highcharts from 'highcharts';
import { GET_ENGAGEMENT_STATUS_MONTHLY } from './apiEndpoints';
import makeRequest from '../utils/makeRequest';
const OPTIONS = (numberOfEngagements, percentagePeopleStaffed, setEngagementStatusData) => {
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var thisMonth = new Date().toLocaleString('default', { month: 'short' });
  const thisMonthIndex = allMonths.indexOf(thisMonth);
  const newCategories = allMonths.slice(thisMonthIndex, 12).concat(allMonths.slice(0, thisMonthIndex));
  return {
    chart: {
      height: 650,
      marginTop: 100,
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    xAxis: [
      {
        categories: newCategories,
        crosshair: true,
      },
    ],
    yAxis: [
      {
        opposite: true,
      },
      {},
      {
        gridLineWidth: 0,
        title: {
          text: '% people staffed',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        labels: {
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      x: -80,
      verticalAlign: 'top',
      y: -6,
      floating: true,
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    series: [
      {
        name: 'Number of Engagements',
        type: 'column',
        yAxis: 1,
        data: numberOfEngagements,
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              const date = new Date();
              const month = date.getMonth();
              const year = date.getFullYear();
              const monthIndex = allMonths.indexOf(this.category);
              let dateString = '';
              if (monthIndex < month) {
                dateString = `${year}-${monthIndex + 1}-${1}`;
              } else {
                dateString = `${year - 1}-${monthIndex + 1}-${1}`;
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
                    setEngagementStatusData(statusData);
                  });
                })
                .catch(err => console.log(err));
            },
          },
        },
      },
      {
        name: '% people staffed',
        type: 'spline',
        yAxis: 2,
        data: percentagePeopleStaffed,
        tooltip: {
          valueSuffix: ' %',
        },
      },
    ],
  };
};

export default OPTIONS;
