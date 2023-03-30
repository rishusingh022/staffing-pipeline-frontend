import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

// eslint-disable-next-line react/prop-types
const PieChart = ({ data, name }) => {
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: name,
    },
    series: [
      {
        name: 'Data',
        data: data,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
