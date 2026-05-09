export const API_URL = "http://172.20.10.3:8000/api/";

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
      Object.values(data).flat().join("\n") ||
      "Request failed";

    throw new Error(message);
  }

  return data;
};

export const loginRequest = (email, password) =>
  apiRequest("token/", {
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
