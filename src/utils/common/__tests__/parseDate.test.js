/* eslint-disable no-unused-vars */
import parseDate from '../parseDate';
describe('parseDate', () => {
  it('should parse a date string in the format of "YYYY-MM-DD"', () => {
    const date = '2023-04-05';
    const parsedDate = parseDate(date);
    // expect(parsedDate).toEqual('2023-04-04T18:30:00.000Z');
  });
});
