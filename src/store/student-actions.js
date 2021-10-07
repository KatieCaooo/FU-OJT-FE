const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const { studentActions } = require('./student-slice');

export const fetchStudentsData = (token) => async (dispatch) => {
  const url = `${BASE_URL}/users`;
  const fetchData = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: getRequiredAuthenHeader(token)
    });

    if (!response.ok) {
      throw new Error('Could not fetch data');
    }

    const data = await response.json();
    return data;
  };

  try {
    const users = await fetchData();
    const students = users.filter((user) => user.role === 'STUDENT');

    dispatch(
      studentActions.replaceStudentList({
        students: students || [],
        totalQuantity: students.length
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendStudentData = () => {};
