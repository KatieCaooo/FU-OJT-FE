import { BASE_URL } from 'src/api/config';
import { accountActions } from './account-slice';

export const login = (payload) => async (dispatch) => {
  const sendRequest = async () => {
    const { email, password } = payload;
    const url = `${BASE_URL}/api/auth/signin`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Logged in successfully!');
    }
    const data = await response.json();
    return data;
  };
  try {
    const data = await sendRequest();
    dispatch(accountActions.login(data));
  } catch (error) {
    console.log(console.error());
  }
};

export const fetchAccount = () => {};
