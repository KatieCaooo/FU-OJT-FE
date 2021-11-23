import { format } from 'date-fns';

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
    let semesters = response.data;
    semesters = semesters.map((semester) => ({
      id: semester.id, name: semester.name, startDate: new Date(semester.startDate), endDate: new Date(semester.endDate)
    }));
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

export const updateSemester = (token, semester, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/semesters/${semester.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      { name: semester.name, startDate: semester.startDate.toISOString(), endDate: semester.endDate.toISOString() },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );
    if (response.status !== 200) {
      throw new Error('Could not update Semester');
    }

    return response.data;
  };

  try {
    await postData().then(async (updateRes) => {
      console.log(updateRes);
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/semesters`;
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
      let semesters = response.data;
      semesters = semesters.map((singleSemester) => ({
        id: singleSemester.id, name: singleSemester.name, startDate: new Date(singleSemester.startDate), endDate: new Date(singleSemester.endDate)
      }));
      dispatch(
        semesterActions.replaceSemesterList({
          semesters: semesters || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSemester = (token, semester, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/semesters`;
  const postData = async () => {
    const response = await axios.post(
      url,
      { name: semester.name, startDate: semester.startDate.toISOString(), endDate: semester.endDate.toISOString() },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not create semester');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/semesters`;
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
      let semesters = response.data;
      semesters = semesters.map((singleSemester) => ({
        id: singleSemester.id, name: singleSemester.name, startDate: new Date(singleSemester.startDate), endDate: new Date(singleSemester.endDate)
      }));
      dispatch(
        semesterActions.replaceSemesterList({
          semesters: semesters || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSemester = (token, semester, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/semesters/${semester.id}`;
  const postData = async () => {
    const response = await axios.delete(
      url,
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not update semester');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async (deleteResponse) => {
        console.log(deleteResponse);
        const fetchUrl = `${BASE_URL}/semesters`;
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
      let semesters = response.data;
      semesters = semesters.map((singleSemester) => ({
        id: singleSemester.id, name: singleSemester.name, startDate: new Date(singleSemester.startDate), endDate: new Date(singleSemester.endDate)
      }));
      dispatch(
        semesterActions.replaceSemesterList({
          semesters: semesters || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const recoverSemester = (token, semester, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/semesters/${semester.id}/recover`;
  const postData = async () => {
    const response = await axios.patch(
      url,
      {},
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not update major');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async (deleteResponse) => {
        console.log(deleteResponse);
        const fetchUrl = `${BASE_URL}/semesters`;
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
      let semesters = response.data;
      semesters = semesters.map((singleSemester) => ({
        id: singleSemester.id, name: singleSemester.name, startDate: format(new Date(singleSemester.startDate), 'dd-MM-yyyy HH:mm:ss.SSS'), endDate: format(new Date(singleSemester.endDate), 'dd-MM-yyyy HH:mm:ss.SSS')
      }));
      dispatch(
        semesterActions.replaceMajorList({
          semesters: semesters || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
