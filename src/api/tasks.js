import apis from '@/config/axiosConfig';

export const createTaskRequest = async (data) => {
  try {
    const response = await apis.post('tasks', data);
    return response.data;
  } catch (error) {
    console.log('createTaskRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const getTasksRequest = async () => {
  try {
    const response = await apis.get('tasks');
    return response.data;
  } catch (error) {
    console.log('getTasksRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const updateTaskRequest = async (taskId, data) => {
  try {
    const response = await apis.put(`tasks/${taskId}`, data);
    return response.data;
  } catch (error) {
    console.log('updateTaskRequest error: ', error);
    throw error.response?.data || error;
  }
};

export const updateTaskStatusRequest = async (taskId, newStatus) => {
  try {
    const response = await apis.patch(`tasks/${taskId}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.log('updateTaskStatusRequest error: ', error);
    throw error.response?.data || error;
  }
};


export const deleteTaskRequest = async (taskId) => {
  try {
    const response = await apis.delete(`tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.log('deleteTaskRequest error: ', error);
    throw error.response?.data || error;
  }
};
