// src/services/userService.ts
const API_BASE_URL = 'http://localhost:3000/users';

const getAuthToken = () => localStorage.getItem('access_token');

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
  return response.json();
};

export const fetchUserStats = async (): Promise<UserStats> => {
  return fetchWithAuth(`${API_BASE_URL}/stats`);
};
