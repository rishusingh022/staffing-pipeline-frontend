import axios from 'axios';
import { BACKEND_URL } from '../../constants/apiEndpoints';
import { ERROR_ROUTE } from '../../constants/routes';
const makeRequest = async (apiEndPoint, dynamicConfig = {}, navigate) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
      headers: {
        authorization: localStorage.getItem('token'),
        ...dynamicConfig.headers,
      },
    };
    const { data } = await axios(requestDetails);
    return data.data;
  } catch (e) {
    const errorStatus = e.response?.status;
    if (errorStatus) {
      const message = e.response.data.error;
      if (apiEndPoint.url === 'excel/upload') {
        return { errorStatus, error: message };
      } else if ((message && message === 'jwt expired') || errorStatus === 401) {
        navigate('/login');
      } else {
        navigate(`${ERROR_ROUTE}/${errorStatus}`, {
          state: {
            message: e.response.data.error,
          },
        });
      }
    } else {
      navigate(ERROR_ROUTE);
    }
    return null;
  }
};

export default makeRequest;
