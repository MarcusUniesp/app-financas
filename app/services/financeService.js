import api from "../services/api";

export const getMe = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBalance = async (date) => {
  try {
    const response = await api.get("/balance", {
      params: { date },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createReceive = async (data) => {
  try {
    const response = await api.post("/receive", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReceivesByDate = async (date) => {
  try {
    const response = await api.get("/receives", {
      params: { date },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteReceive = async (itemId) => {
  try {
    const response = await api.delete("/receives/delete", {
      params: { item_id: itemId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
