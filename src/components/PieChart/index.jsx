import React from 'react';
import { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

import exportingModule from 'highcharts/modules/exporting';
exportingModule(Highcharts);

// eslint-disable-next-line react/prop-types
const PieChart = ({ data, name }) => {
  const chartComponent = useRef(null);
  // const printChartAsImage = () => {
  //   // chart to image
  //   const chart = chartComponent.current.chart;
  //   console.log(chart.getSVG());
  // };

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
      {/* <button onClick={printChartAsImage}>Download</button> */}
      <div id="element-to-print">
        <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponent} />
      </div>
    </div>
  );
};

export default PieChart;
