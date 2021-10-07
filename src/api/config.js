import { useSelector } from 'react-redux';

export const BASE_URL = 'http://localhost:9004/backend';
export const getRequiredAuthenHeader = () => {
  const account = useSelector((state) => state.account);
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${account.token}`
  };
};

export const getPublicHeader = () => ({
  'Content-Type': 'application/json'
});
