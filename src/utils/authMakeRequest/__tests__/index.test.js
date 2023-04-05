import axios from 'axios';
import makeRequest from '..';
import { BACKEND_URL } from '../../../constants/apiEndpoints';

jest.mock('axios');

describe('makeRequest function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call axios with the correct arguments', async () => {
    const mockResponse = { data: { key: 'value' } };
    const apiEndPoint = { url: '/api/data', method: 'get' };
    const dynamicConfig = { headers: { Authorization: 'Bearer token' } };

    const expectedRequestDetails = {
      baseURL: BACKEND_URL,
      url: '/api/data',
      method: 'get',
      headers: { Authorization: 'Bearer token' },
    };

    axios.mockResolvedValueOnce(mockResponse);
    await makeRequest(apiEndPoint, dynamicConfig);
    expect(axios).toHaveBeenCalledWith(expectedRequestDetails);
  });

  it('should return the data from the axios response', async () => {
    const apiEndPoint = { url: '/api/data', method: 'get' };
    const responseData = { key: 'value' };

    axios.mockResolvedValueOnce({ data: responseData });

    const result = await makeRequest(apiEndPoint);

    expect(result).toEqual(responseData);
  });

  it('should throw an error if axios throws an error', async () => {
    const apiEndPoint = { url: '/api/data', method: 'get' };

    axios.mockRejectedValueOnce(new Error('Network error'));

    await expect(makeRequest(apiEndPoint)).rejects.toThrow('Network error');
  });
});
