import { formatDate } from '..';
import { dateFormater } from '..';
describe('DateTime Utils', () => {
  describe('function formatDate', () => {
    it('returns formatted date in MM/DD/YYYY format', () => {
      const date = new Date('2022-03-15');
      const formattedDate = formatDate(date);
      expect(formattedDate).toEqual('3/15/2022');
    });
    it('returns formatted date in YYYY-MM-DD format', () => {
      const date = new Date('2022-03-15');
      const formattedDate = dateFormater(date);
      expect(formattedDate).toEqual('2022-03-15');
    });
  });
});
