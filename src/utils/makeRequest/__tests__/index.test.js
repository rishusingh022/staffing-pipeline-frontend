import makeRequest from '..';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/apiEndpoints';
import { ERROR_ROUTE } from '../../../constants/routes';

jest.mock('axios');

describe('makeRequest', () => {
  const mockedAxios = axios;
  const mockedNavigate = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should make API call with appropriate request options and return response body when only endpoint is specified', async () => {
    const mockData = [];
    mockedAxios.mockResolvedValueOnce({
      data: mockData,
    });
    const mockApiEndpoint = {
      url: 'test',
      method: 'get',
    };
    const mockDyanmicConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        test: 'test',
      },
    };
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(mockApiEndpoint, mockDyanmicConfig, mockedNavigate);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: mockApiEndpoint.url,
      method: mockApiEndpoint.method,
      ...mockDyanmicConfig,
      headers: {
        ...mockDyanmicConfig.headers,
      },
      params: {
        ...mockDyanmicConfig.params,
      },
    });
    expect(response).toEqual(undefined);
  });
  it('should navigate to error page with status code when API call returns error status code', async () => {
    const mockNavigate = jest.fn();
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          error: 'Internal Server Error',
        },
      },
    });

    const mockApiEndpoint = {
      url: 'test',
      method: 'get',
    };
    const mockDyanmicConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        test: 'test',
      },
    };
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(mockApiEndpoint, mockDyanmicConfig, mockNavigate);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: mockApiEndpoint.url,
      method: mockApiEndpoint.method,
      ...mockDyanmicConfig,
      headers: {
        ...mockDyanmicConfig.headers,
      },
      params: {
        ...mockDyanmicConfig.params,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`${ERROR_ROUTE}/500`, {
      state: {
        message: 'Internal Server Error',
      },
    });
    expect(response).toEqual(null);
  });
  it('should navigate to login page  when API call returns error status code 401', async () => {
    const mockNavigate = jest.fn();
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          error: 'jwt expired',
        },
      },
    });

    const mockApiEndpoint = {
      url: 'test',
      method: 'get',
    };
    const mockDyanmicConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        test: 'test',
      },
    };
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(mockApiEndpoint, mockDyanmicConfig, mockNavigate);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: mockApiEndpoint.url,
      method: mockApiEndpoint.method,
      ...mockDyanmicConfig,
      headers: {
        ...mockDyanmicConfig.headers,
      },
      params: {
        ...mockDyanmicConfig.params,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(response).toEqual(null);
  });
  it('should navigate to error  when API call returns error no status code', async () => {
    const mockNavigate = jest.fn();
    mockedAxios.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Something went wrong',
        },
      },
    });

    const mockApiEndpoint = {
      url: 'test',
      method: 'get',
    };
    const mockDyanmicConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        test: 'test',
      },
    };
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(mockApiEndpoint, mockDyanmicConfig, mockNavigate);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: mockApiEndpoint.url,
      method: mockApiEndpoint.method,
      ...mockDyanmicConfig,
      headers: {
        ...mockDyanmicConfig.headers,
      },
      params: {
        ...mockDyanmicConfig.params,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/error');
    expect(response).toEqual(null);
  });
  it('should return error message and status code when API call with excel/upload', async () => {
    const mockNavigate = jest.fn();
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          error: 'Something went wrong',
        },
      },
    });

    const mockApiEndpoint = {
      url: 'excel/upload',
      method: 'get',
    };
    const mockDyanmicConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        test: 'test',
      },
    };
    expect(mockedAxios).not.toHaveBeenCalled();
    const response = await makeRequest(mockApiEndpoint, mockDyanmicConfig, mockNavigate);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: mockApiEndpoint.url,
      method: mockApiEndpoint.method,
      ...mockDyanmicConfig,
      headers: {
        ...mockDyanmicConfig.headers,
      },
      params: {
        ...mockDyanmicConfig.params,
      },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(0);
    expect(response).toEqual({
      error: 'Something went wrong',
      errorStatus: 500,
    });
  });
});
