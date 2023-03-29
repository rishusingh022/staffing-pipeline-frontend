import Highcharts from 'highcharts';
const OPTIONS = (numberOfEngagements, percentagePeopleStaffed) => {
  return {
    title: {
      text: 'Staffing Metrics',
    },
    xAxis: [
      {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      align: 'left',
      x: 80,
      verticalAlign: 'top',
      y: 55,
      floating: true,
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    series: [
      {
        name: 'Number of Engagements',
        type: 'column',
        yAxis: 1,
        data: numberOfEngagements,
        // data: numberOfEngagements,
      },
      {
        name: '% people staffed',
        type: 'spline',
        yAxis: 2,
        data: percentagePeopleStaffed,
        // data: percentagePeopleStaffed,
        tooltip: {
          valueSuffix: ' %',
        },
      },
    ],
  };
};

export default OPTIONS;
