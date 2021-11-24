const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { studentActions } = require('./student-slice');

export const fetchStudentsData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/users`;
  const fetchData = async () => {
    const response = await axios.get(url, {
      params: {
        search: `student.id > 0${search && search !== '' ? `;${search}` : ''}`, pageSize, pageNo, sortBy
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
    const students = response.data;
    dispatch(
      studentActions.replaceStudentList({
        students: students || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = (token, student, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/users/${student.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      {
        name: student.name, studentCode: student.studentCode, semesterId: student.semesterId, email: student.email, address: student.address, phone: student.phone, major: student.major
      },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not update Student');
    }

    return response.data;
  };

  try {
    await postData().then(async (updateRes) => {
      console.log(updateRes);
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/users`;
        const response = await axios.get(fetchUrl, {
          params: {
            search: `id > 0${search && search !== '' ? `;${search}` : ''}`,
            pageSize,
            pageNo,
            sortBy
          },
          headers: getRequiredAuthenHeader(token)
        });

        if (response.status !== 200) {
          throw new Error('Could not fetch data');
        }

        return response.data;
      };
      const response = await fetchData();
      let students = response.data;
      students = students.map((singleStudent) => ({
        id: singleStudent.id, name: singleStudent.name, studentCode: singleStudent.studentCode, semester: singleStudent.semester, email: singleStudent.email, address: singleStudent.address, phone: singleStudent.phone, major: singleStudent.major
      }));
      dispatch(
        studentActions.replaceStudentList({
          students: students || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = (token, student, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/users/${student.id}`;
  const postData = async () => {
    const response = await axios.delete(
      url,
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not delete student');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async (deleteResponse) => {
        console.log(deleteResponse);
        const fetchUrl = `${BASE_URL}/users`;
        const response = await axios.get(fetchUrl, {
          params: {
            search: `id > 0${search && search !== '' ? `;${search}` : ''}`,
            pageSize,
            pageNo,
            sortBy
          },
          headers: getRequiredAuthenHeader(token)
        });

        if (response.status !== 200) {
          throw new Error('Could not fetch data');
        }

        return response.data;
      };
      const response = await fetchData();
      let students = response.data;
      students = students.map((singleStudent) => ({
        id: singleStudent.id, name: singleStudent.name, studentCode: singleStudent.studentCode, semester: singleStudent.semester, email: singleStudent.email, address: singleStudent.address, phone: singleStudent.phone, major: singleStudent.major
      }));
      dispatch(
        studentActions.replaceStudentList({
          students: students || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
