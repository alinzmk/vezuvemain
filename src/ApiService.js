import axios from 'axios';
const BASE_URL = 'https://localhost:6161'; 

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user_token`,
      {
        username,
        password,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const getUserData = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_data`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};


export const setUserData = async (accessToken, column, newValue) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/set_user_data`,
      {
        column,
        newValue,
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


export const getUserPlan = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_plan`, {
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

export const getUserPortfolio = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_portfolio`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user portfolio:', error);
    throw error;
  }
};

export const getUserDocuments = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_documents`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting user documents:', error);
    throw error;
  }
};

export const uploadDocument = async (accessToken, fileName, file) => {
  try {
    // Check file type
    if (file.type !== 'application/pdf') {
      throw new Error('Invalid file type. Only PDF files are allowed.');
    }

    // Check file size (max size: 20 MB)
    if (file.size > 20 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 20 MB.');
    }

    const formData = new FormData();
    formData.append('file_name', fileName);
    formData.append('file', file);

    const response = await axios.post(`${BASE_URL}/upload_document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const downloadDocument = async (accessToken, fileName, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/download_document`, {
      params: {
        user_id: userId,
        file_name: fileName,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      responseType: 'blob', // Important for handling binary data
    });

    // Create a blob URL from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and trigger a click to start the download
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Cleanup: remove the temporary link and revoke the blob URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    return { status: response.status, message: 'Download successful' };
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};

export const getUserProducts = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_products`, {
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

export const addProductToUser = async (accessToken, products) => {
  try {
    const response = await axios.post(`${BASE_URL}/add_product_to_user`, {
      product: products,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding product to user:', error);
    throw error;
  }
};


export const createPaymentLink = async (accessToken, productId) => {
  try {
    const response = await axios.post(`${BASE_URL}/create_payment_link`, {
      product_id: productId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};