import * as React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import OPTIONS from '../../constants/barChartOptions';

const BarChart = ({ numberOfEngagements, peopleStaffed }) => {
  // const people = [50, 60, 10, 24, 88, 12, 89, 78, 56, 90, 87, 23];
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="h-6/12 w-4/6">
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
