import Highcharts from 'highcharts';
import applyTheme from '..';
import colorPallete from '../../../constants/colorPallete';

describe('applyTheme function', () => {
  it('should set Highcharts theme with the provided colorPallete', () => {
    applyTheme();
    expect(Highcharts.theme.colors).toEqual(colorPallete.dataVisualisation);
  });

  it('should set Highcharts title and subtitle styles correctly', () => {
    applyTheme();
    expect(Highcharts.theme.title.style).toEqual({
      color: '#000',
      font: 'bold 28px "Trebuchet MS", Verdana, sans-serif',
    });
    expect(Highcharts.theme.subtitle.style).toEqual({
      color: '#666666',
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
    });
  });

  it('should set Highcharts legend styles correctly', () => {
    applyTheme();
    expect(Highcharts.theme.legend).toEqual({
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemHoverStyle: {
        color: 'gray',
      },
    });
  });

  it('should not set Highcharts chart backgroundColor', () => {
    applyTheme();
    expect(Highcharts.theme.chart.backgroundColor).toBeUndefined();
  });
});
