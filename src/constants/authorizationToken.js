const AUTHORIZATION_TOKEN = localStorage.getItem('token') || null;

export default () => AUTHORIZATION_TOKEN;
