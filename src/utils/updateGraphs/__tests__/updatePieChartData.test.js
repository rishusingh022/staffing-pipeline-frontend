import makeRequest from '../../makeRequest';
import { GET_ENGAGEMENT_STATUS_MONTHLY } from '../../../constants/apiEndpoints';
import updatePieChartData from '../updatePieChartData';
// mock the makeRequest function
jest.mock('../../makeRequest');

describe('updatePieChartData', () => {
  it('should make Request with correct argument', () => {
    // resolve the make request promise with a mock response
    makeRequest.mockResolvedValue([
      {
        status: 'ongoing',
      },
      {
        status: 'completed',
      },
      {
        status: 'upcoming',
      },
    ]);
    // Arrange
    const newCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const setEngagementStatusData = jest.fn();
    const setUserStatusData = jest.fn();
    const numberOfPeopleStaffed = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
    const selectedMonth = 'Jan';
    const setStaffingPercentage = jest.fn();
    const setCurrentMonth = jest.fn();
    updatePieChartData(
      newCategories,
      setEngagementStatusData,
      setUserStatusData,
      numberOfPeopleStaffed,
      selectedMonth,
      setStaffingPercentage,
      setCurrentMonth
    );
    // Assert
    let dateString = '';
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const index = newCategories.indexOf(selectedMonth);
    if (index < month) {
      dateString = `${year}-${index + 1}-${1}`;
      setCurrentMonth(`${new Date(dateString).toLocaleString('default', { month: 'long' })} ${year}`);
    } else {
      dateString = `${year - 1}-${index + 1}-${1}`;
      setCurrentMonth(`${new Date(dateString).toLocaleString('default', { month: 'long' })} ${year - 1}`);
    }
    expect(makeRequest).toHaveBeenCalledWith(GET_ENGAGEMENT_STATUS_MONTHLY, { data: { startDate: dateString } });
  });
  it('should show error when makeRequest fails', () => {
    // reject the make request promise with a mock error
    makeRequest.mockRejectedValue(new Error('error'));
    // Arrange
    const newCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const setEngagementStatusData = jest.fn();
    const setUserStatusData = jest.fn();
    const numberOfPeopleStaffed = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
    const selectedMonth = 'Jan';
    const setStaffingPercentage = jest.fn();
    const setCurrentMonth = jest.fn();
    updatePieChartData(
      newCategories,
      setEngagementStatusData,
      setUserStatusData,
      numberOfPeopleStaffed,
      selectedMonth,
      setStaffingPercentage,
      setCurrentMonth
    );
  });
  it('should render with correct data when index is greater than month', () => {
    makeRequest.mockResolvedValue([
      {
        status: 'ongoing',
      },
      {
        status: 'completed',
      },
      {
        status: 'upcoming',
      },
    ]);
    // Arrange
    const newCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const setEngagementStatusData = jest.fn();
    const setUserStatusData = jest.fn();
    const numberOfPeopleStaffed = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
    const selectedMonth = 'Dec';
    const setStaffingPercentage = jest.fn();
    const setCurrentMonth = jest.fn();
    updatePieChartData(
      newCategories,
      setEngagementStatusData,
      setUserStatusData,
      numberOfPeopleStaffed,
      selectedMonth,
      setStaffingPercentage,
      setCurrentMonth
    );
    // Assert
    let dateString = '';
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const index = newCategories.indexOf(selectedMonth);
    if (index < month) {
      dateString = `${year}-${index + 1}-${1}`;
      setCurrentMonth(`${new Date(dateString).toLocaleString('default', { month: 'long' })} ${year}`);
    } else {
      dateString = `${year - 1}-${index + 1}-${1}`;
      setCurrentMonth(`${new Date(dateString).toLocaleString('default', { month: 'long' })} ${year - 1}`);
    }
    expect(makeRequest).toHaveBeenCalledWith(GET_ENGAGEMENT_STATUS_MONTHLY, { data: { startDate: dateString } });
  });
});
