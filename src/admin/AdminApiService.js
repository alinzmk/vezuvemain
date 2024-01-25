import axios from "axios";
const BASE_URL = 'https://localhost:6161'; 

export const getAdminToken = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin_token`,
      {
        username,
        password,
        grant_type: 'password',
        scope: 'admin', // Adjust the scope if needed
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error getting admin token:', error);
    throw error;
  }
};

export const getAllUserData = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_all_user_data`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting all user data:', error);
    throw error;
  }
};

export const setUserData = async (accessToken, column, newValue, userId, customerId) => {
  try {
    const response = await axios.post( `${BASE_URL}/set_user_data`, {
        column,
        newValue,
        user_id: userId,
        customer_id: customerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting user data:', error);
    throw error;
  }
};

export const getUserDocuments = async (accessToken, userId, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_documents`, {
      params: {
        user_id: userId,
        customer_id: customerId,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user documents:', error);
    throw error;
  }
};

export const setUserDocuments = async (accessToken, column, newValue, userId, customerId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_user_documents`,
      {
        column,
        newValue,
        user_id: userId,
        customer_id: customerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting user documents:', error);
    throw error;
  }
};

export const uploadUserDocument = async (accessToken, fileName, file, customerId) => {
  try {
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      throw new Error('Invalid file type. Only PDF files are allowed.');
    }

    // Check if the file size is less than 20 MB
    const maxSize = 20 * 1024 * 1024; // 20 MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds the maximum limit of 20 MB.');
    }

    const formData = new FormData();
    formData.append('file_name', fileName);
    formData.append('file', file);
    formData.append('customer_id', customerId);

    const response = await axios.post(`${BASE_URL}/upload_user_document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading user document:', error);
    throw error;
  }
};

export const downloadDocument = async (accessToken, fileName, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/download_document`, {
      params: {
        file_name: fileName,
        customer_id: customerId,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      responseType: 'blob', // Specify the response type as a blob
    });

    // Create a blob URL to make the file downloadable
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a link and trigger a click event to initiate the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { status: 200, info: 'Download successful' };
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};

export const getUserPlan = async (accessToken, userId, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_plan`, {
      params: {
        user_id: userId,
        customer_id: customerId,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user plan:', error);
    throw error;
  }
};

// SET USER PLAN EKLENECEK


export const getUserTasks = async (accessToken, userId, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_tasks`, {
      params: {
        user_id: userId,
        customer_id: customerId,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user tasks:', error);
    throw error;
  }
};

export const setUserTasks = async (accessToken, userId, column, newValue, customerId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_user_tasks`,
      {
        user_id: userId,
        column,
        newValue,
        customer_id: customerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error setting user tasks:', error);
    throw error;
  }
};

export const createUserTask = async (accessToken, customerId, taskName) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/create_user_task`,
      {
        customer_id: customerId,
        task_name: taskName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating user task:', error);
    throw error;
  }
};

export const getUserProducts = async (accessToken, userId, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_products`, {
      params: {
        user_id: userId,
        customer_id: customerId,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user products:', error);
    throw error;
  }
};

export const addProductToUser = async (accessToken, userId, product, customerId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/add_product_to_user`,
      {
        user_id: userId,
        product,
        customer_id: customerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error adding product to user:', error);
    throw error;
  }
};


export const deleteProduct = async (accessToken, userId, productId, customerId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete_product`, {
      data: {
        user_id: userId,
        product_id: productId,
        customer_id: customerId,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

