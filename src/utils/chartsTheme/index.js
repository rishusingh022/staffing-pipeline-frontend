import Highcharts from 'highcharts';
import colorPallete from '../../constants/colorPallete';

const applyTheme = () => {
  Highcharts.theme = {
    colors: colorPallete.dataVisualisation,
    chart: {
      // backgroundColor: {
      //   linearGradient: [0, 0, 500, 500],
      //   stops: [
      //     [0, 'rgb(255, 255, 255)'],
      //     [1, 'rgb(240, 240, 255)']
      //   ]
      // },
    },
    title: {
      style: {
        color: '#000',
        font: 'bold 28px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    subtitle: {
      style: {
        color: '#666666',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemHoverStyle: {
        color: 'gray',
      },
    },
  };

  Highcharts.setOptions(Highcharts.theme);
};

export default applyTheme;
