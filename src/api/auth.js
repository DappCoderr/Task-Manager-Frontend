import apis from '@/config/axiosConfig';

export const registerRequest = async ({ username, email, password }) => {
  try {
    console.log("API URL =", process.env.NEXT_PUBLIC_API_URL);
    const response = await apis.post('auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log('registerRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const loginRequest = async ({ email, password }) => {
  try {
    const response = await apis.post('auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log('loginRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const logoutRequest = async () => {
  try {
    const response = await apis.post('auth/logout');
    return response.data;
  } catch (error) {
    console.log('logoutRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const refreshtokenRequest = async () => {
  try {
    const response = await apis.post('auth/refresh');
    return response.data;
  } catch (error) {
    console.log('refresh token request error: ', error);
    throw error.response?.data || error;
  }
};