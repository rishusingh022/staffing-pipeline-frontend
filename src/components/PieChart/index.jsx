import React from 'react';
import { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

import exportingModule from 'highcharts/modules/exporting';
exportingModule(Highcharts);

// eslint-disable-next-line react/prop-types, no-unused-vars
const PieChart = ({ data }) => {
  const chartComponent = useRef(null);

  const options = {
    chart: {
      type: 'pie',
      marginTop: 50,
    },
    title: {
      text: undefined,
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
      <div id="element-to-print">
        <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponent} />
      </div>
    </div>
  );
};

export default PieChart;
