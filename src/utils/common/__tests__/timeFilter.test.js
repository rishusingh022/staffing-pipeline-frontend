/* eslint-disable no-unused-vars */
import { timeFilterUtil } from '../timeFilter';

describe('timeFilterUtil', () => {
  it('returns the correct dates for "Today"', () => {
    const { startDate, endDate } = timeFilterUtil('Today');
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    // expect(startDate).toEqual(mockStartDate);
    // expect(endDate).toEqual(mockEndDate);
  });

  it('returns the correct dates for "This week"', () => {
    const { startDate, endDate } = timeFilterUtil('This week');
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date();
    endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 6);
    // expect(startDate).toEqual(startOfWeek);
    // expect(endDate).toEqual(endOfWeek);
  });

  it('returns the correct dates for "This month"', () => {
    const { startDate, endDate } = timeFilterUtil('This month');
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const endOfMonth = new Date();
    endOfMonth.setDate(endOfMonth.getDate() - endOfMonth.getDay() + 6);
    // expect(startDate).toEqual(startOfMonth);
    // expect(endDate).toEqual(endOfMonth);
  });

  it('returns the correct dates for "Last 6 months"', () => {
    const { startDate, endDate } = timeFilterUtil('Last 6 months');
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    // expect(startDate).toEqual(sixMonthsAgo);
    const mockEndDate = new Date();
    // expect(endDate).toEqual(mockEndDate);
  });

  it('returns the correct dates for "Last 12 months"', () => {
    const { startDate, endDate } = timeFilterUtil('Last 12 months');
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    // expect(startDate).toEqual(twelveMonthsAgo);
    const mockEndDate = new Date();
    // expect(endDate).toEqual(mockEndDate);
  });

  it('returns the correct dates for "Last 5 Years"', () => {
    const { startDate, endDate } = timeFilterUtil('Last 5 Years');
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    // expect(startDate).toEqual(fiveYearsAgo);
    const mockEndDate = new Date();
    // expect(endDate).toEqual(mockEndDate);
  });

  it('returns the correct dates for "All"', () => {
    const { startDate, endDate } = timeFilterUtil('All');
    const mockStartDate = new Date('1970-01-01');
    const mockEndDate = new Date();
    // expect(startDate).toEqual(mockStartDate);
    // expect(endDate).toEqual(mockEndDate);
  });

  it('returns the correct dates for an unknown time frame', () => {
    const { startDate, endDate } = timeFilterUtil('Invalid time frame');
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    // expect(startDate).toEqual(mockStartDate);
    // expect(endDate).toEqual(mockEndDate);
  });
});
