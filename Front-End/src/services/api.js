import API_BASE_URL from "../config/api";

export const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
export const createSelection = async (platformName, platformPlan) => {
  const token = localStorage.getItem("token");

  return await apiRequest(
    "/user-selections",
    "POST",
    {
      platformName,
      platformPlan,
    },
    token
  );
};
