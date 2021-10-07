// export const BASE_URL = 'http://localhost:9004/backend';
export const BASE_URL = 'http://ojt-management.link/backend';
export const getRequiredAuthenHeader = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
});

export const getPublicHeader = () => ({
  'Content-Type': 'application/json'
});
