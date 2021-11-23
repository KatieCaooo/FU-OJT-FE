const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { semesterActions } = require('./semester-slice');

export const fetchSemestersData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/semesters`;
  const fetchData = async () => {
    const response = await axios.get(url, {
      params: {
        search: `id > 0${search && search !== '' ? `;${search}` : ''}`, pageSize, pageNo, sortBy
      },
      headers: getRequiredAuthenHeader(token)
    });

    if (response.status !== 200) {
      throw new Error('Could not fetch data');
    }

    return response.data;
  };

  try {
    const response = await fetchData();
    const semesters = response.data;
    dispatch(
      semesterActions.replaceSemesterList({
        semesters: semesters || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendSemesterData = () => {};
