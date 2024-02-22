import axios from "axios";
import { warningNotification } from "../Modals/Notification";
const BASE_URL = 'http://adminapi.vezuport.com'; 

export const getAdminToken = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin_token`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    );

    return response.data;
  } catch (error) {
    warningNotification("GİRİŞ BAŞARISIZ")
    console.error('Error getting admin token:', error);
    throw error;
  }
};

export const getAllUserData = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_all_user_data`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching all user data:', error);
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

export const getUserPortfolio = async (accessToken, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_portfolio?customer_id=${customerId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    throw error;
  }
};

export const getUserPlan = async (accessToken, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_plan`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        customer_id: customerId,
      },
    });
    
    return response.data;
  } 
  catch (error) {
    console.error('Error fetching user plan:', error);
    throw error;
  }
};

export const getUserDocuments = async (accessToken, customerId) => {
  console.log(customerId, accessToken)
  try {
    const response = await axios.get(`${BASE_URL}/get_user_documents?customer_id=${customerId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching user documents:', error);
    throw error;
  }
};

export const uploadDocument = async (accessToken, fileName, file, customerID) => {
 
  
};

export const downloadDocument = async (accessToken, fileName, customer_id) => {

};

// SET USER PLAN EKLENECEK

export const getUserTasks = async (accessToken, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_tasks?customer_id=${customerId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user tasks:', error);
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


export const getUserProducts = async (accessToken, customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_products?customer_id=${customerId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user products:', error);
    throw error;
  }
};

export const addProductToUser = async (file, customer_id, accessToken) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('customer_id', customer_id);

    const response = await axios.post(`${BASE_URL}/add_product_to_user`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding product to user:', error);
    throw error;
  }
};


export const deleteProduct = async (product_id, customer_id, accessToken) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete_product`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      data: {
        product_id: product_id,
        customer_id: customer_id,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
