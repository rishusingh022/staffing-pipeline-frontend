export const BACKEND_URL = 'http://localhost:8000/';

export const GET_USER_DATA_URL = {
  url: 'api/users',
  method: 'get',
};
export const CREATE_USER_DATA_URL = {
  url: 'api/users',
  method: 'post',
};
export const GET_USER_DATA_BY_ID_URL = id => ({
  url: `api/users/${id}`,
  method: 'get',
});

export const UPDATE_USER_DATA_URL = id => ({
  url: `api/users/${id}`,
  method: 'put',
});

export const DELETE_USER_DATA_URL = id => ({
  url: `api/users/${id}`,
  method: 'delete',
});

export const GET_ENGAGEMENT_DATA_URL = {
  url: 'api/projects',
  method: 'get',
};

export const CREATE_ENGAGEMENT_DATA_URL = {
  url: 'api/projects',
  method: 'post',
};

export const GET_ENGAGEMENT_DATA_BY_ID_URL = id => ({
  url: `api/projects/${id}`,
  method: 'get',
});

export const UPDATE_ENGAGEMENT_DATA_URL = id => ({
  url: `api/projects/${id}`,
  method: 'put',
});

export const DELETE_ENGAGEMENT_DATA_URL = id => ({
  url: `api/projects/${id}`,
  method: 'delete',
});

export const GET_CASE_STUDIES_DATA_URL = {
  url: 'api/case-studies',
  method: 'get',
};

export const CREATE_CASE_STUDIES_DATA_URL = {
  url: 'api/case-studies',
  method: 'post',
};

export const GET_CASE_STUDIES_DATA_BY_ID_URL = id => ({
  url: `api/case-studies/${id}`,
  method: 'get',
});

export const UPDATE_CASE_STUDIES_DATA_URL = id => ({
  url: `api/case-studies/${id}`,
  method: 'put',
});

export const DELETE_CASE_STUDIES_DATA_URL = id => ({
  url: `api/case-studies/${id}`,
  method: 'delete',
});

export const GET_DATA_BY_SEARCH_URL = (entity, searchQuery) => ({
  url: `api/search/${entity}?name=${searchQuery}`,
  method: 'get',
});

export const AUTH_LOGIN_URL = () => ({
  url: `/auth/login`,
  method: 'post',
});

export const UPLOAD_EXCEL_ROUTE = {
  url: 'excel/upload',
  method: 'post',
};

export const UPLOAD_ENGAGEMENT_IMAGE_ROUTE = {
  url: '/image/upload/engagement',
  method: 'post',
};
export const UPLOAD_CASE_STUDY_IMAGE_ROUTE = {
  url: '/image/upload/case-study',
  method: 'post',
};

export const GET_USERS_INVOLVED_IN_ENGAGEMENT = id => {
  return {
    url: `api/staffing/all-users/${id}`,
    method: 'get',
  };
};

export const GET_USER_SKILL_ROUTE = userId => ({
  url: `api/skills/${userId}`,
  method: 'get',
});

export const GET_USER_ROLE_URL = {
  url: 'api/user-role',
  method: 'get',
};
export const ADD_USER_SKILL_ROUTE = userId => ({
  url: `api/skills/${userId}`,
  method: 'post',
});

export const UPDATE_USER_SKILL_ROUTE = userId => ({
  url: `api/skills/${userId}`,
  method: 'post',
});

export const UPLOAD_USER_IMAGE_ROUTE = {
  url: '/image/upload/user',
  method: 'post',
};
export const GET_PROJECTS_METRICS = {
  url: '/api/projects/metrics',
  method: 'get',
};

export const GET_ENGAGEMENT_COUNT = {
  url: 'api/count/projects',
  method: 'get',
};

export const GET_CASE_STUDY_COUNT = {
  url: 'api/count/case-studies',
  method: 'get',
};

export const GET_USER_COUNT = {
  url: 'api/count/users',
  method: 'get',
};
export const CURRENT_USER_IN_ENGAGEMENTS = engagementId => ({
  url: `api/staffing/current-users/${engagementId}`,
  method: 'get',
});
export const GET_USER_METRICS = {
  url: '/api/users/metrics',
  method: 'get',
};
