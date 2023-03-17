import axios from 'axios';
import { BACKEND_URL } from '../../constants/apiEndpoints';
import { ERROR_ROUTE } from '../../constants/routes';
const AUTHORIZATION_TOKEN = localStorage.getItem('token') || null;

const makeRequest = async (apiEndPoint, dynamicConfig = {}, navigate) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
      headers: {
        authorization: AUTHORIZATION_TOKEN,
      },
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    const errorStatus = e.response?.status;
    if (errorStatus) {
      navigate(`${ERROR_ROUTE}/${errorStatus}`, {
        state: {
          message: e.response.data.error,
        },
      });
    } else {
      navigate(ERROR_ROUTE);
    }
    return null;
  }
};

export default makeRequest;
