import apis from '@/config/axiosConfig';

export const getProfileRequest = async () => {
  try {
    const response = await apis.get('users/profile');
    return response.data;
  } catch (error) {
    console.log('getProfileRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const updateProfileRequest = async (data) => {
  try {
    const response = await apis.put('users/profile', data);
    return response.data;
  } catch (error) {
    console.log('updateProfileRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const deleteProfileRequest = async () => {
  try {
    const response = await apis.delete('users/profile');
    return response.data;
  } catch (error) {
    console.log('deleteProfileRequest error: ', error);
    throw error.response?.data || error;
  }
};