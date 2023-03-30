import * as React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import OPTIONS from '../../constants/barChartOptions';
require('highcharts/modules/exporting')(Highcharts);

const BarChart = ({ numberOfEngagements, peopleStaffed }) => {
  // const people = [50, 60, 10, 24, 88, 12, 89, 78, 56, 90, 87, 23];
  return (
    <div className="self-center w-full flex flex-col justify-center items-center">
      <div className="w-full">
        <HighchartsReact highcharts={Highcharts} options={OPTIONS(numberOfEngagements, peopleStaffed)} />
      </div>
    </div>
  );
};
BarChart.propTypes = {
  numberOfEngagements: PropTypes.arrayOf(PropTypes.number).isRequired,
  peopleStaffed: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default BarChart;
