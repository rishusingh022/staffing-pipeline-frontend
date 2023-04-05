import updatePieChartData from '../utils/updateGraphs/updatePieChartData';
const OPTIONS = (
  numberOfEngagements,
  percentagePeopleStaffed,
  setEngagementStatusData,
  setUserStatusData,
  numberOfPeopleStaffed,
  setStaffingPercentage,
  setCurrentMonth
) => {
  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var thisMonth = new Date().toLocaleString('default', { month: 'short' });
  const thisMonthIndex = allMonths.indexOf(thisMonth);
  const newCategories = allMonths.slice(thisMonthIndex, 12).concat(allMonths.slice(0, thisMonthIndex));
  return {
    chart: {
      height: 550,
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
            color: 'gray',
          },
        },
        labels: {
          style: {
            color: 'gray',
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
        states: {
          select: {
            color: '#051C2C',
          },
        },
        point: {
          events: {
            click: function () {
              return updatePieChartData(
                newCategories,
                setEngagementStatusData,
                setUserStatusData,
                numberOfPeopleStaffed,
                this.category,
                setStaffingPercentage,
                setCurrentMonth
              );
            },
          },
        },
        allowPointSelect: true,
      },
      {
        name: '% people staffed',
        color: '#FECD75',
        type: 'spline',
        yAxis: 2,
        data: percentagePeopleStaffed,
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              return updatePieChartData(
                newCategories,
                setEngagementStatusData,
                setUserStatusData,
                numberOfPeopleStaffed,
                this.category,
                setStaffingPercentage,
                setCurrentMonth
              );
            },
          },
        },
        allowPointSelect: true,
      },
    ],
  };
};

export default OPTIONS;
