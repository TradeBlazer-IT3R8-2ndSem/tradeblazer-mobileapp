import { getItem } from '../utils/storage';

export const API_URL = "http://172.18.48.1:8000/api/";

const parseJson = async (response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await parseJson(response);

  if (!response.ok) {
    const message =
      data.detail ||
      data.message ||
      data.error ||
      Object.values(data).flat().join("\n") ||
      "Request failed";

    throw new Error(message);
  }

  return data;
};

export const loginRequest = (email, password) =>
  apiRequest("login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const registerRequest = (user) =>
  apiRequest("register/", {
    method: "POST",
    body: JSON.stringify({
      username: user.name,
      email: user.email,
      password: user.password,
      student_id: user.studentId,
      department: user.department,
      phone_number: user.number,
      address: user.address,
    }),
  });

export const createPost = async (formData) => {
  const token = await getItem('accessToken');
  console.log('TOKEN:', token);

  const response = await fetch(`${API_URL}posts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message =
      data.detail ||
      data.message ||
      Object.values(data).flat().join('\n') ||
      'Failed to create post';
    throw new Error(message);
  }

  return data;
};