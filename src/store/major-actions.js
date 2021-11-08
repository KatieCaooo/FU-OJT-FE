import { format } from 'date-fns';

const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { majorActions } = require('./major-slice');

export const fetchMajorsData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/majors`;
  const fetchData = async () => {
    const response = await axios.get(url, {
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

  try {
    const response = await fetchData();
    let majors = response.data;
    majors = majors.map((major) => ({
      id: major.id, name: major.name, createdAt: format(new Date(major.createdAt), 'dd-MM-yyyy HH:mm:ss.SSS'), updatedAt: format(new Date(major.updatedAt), 'dd-MM-yyyy HH:mm:ss.SSS'), disabled: major.disabled
    }));
    dispatch(
      majorActions.replaceMajorList({
        majors: majors || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateMajor = (token, major, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/majors/${major.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      { name: major.name },
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
    await postData().then(async (updateRes) => {
      console.log(updateRes);
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/majors`;
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
      let majors = response.data;
      majors = majors.map((singleMajor) => ({
        id: singleMajor.id, name: singleMajor.name, createdAt: format(new Date(singleMajor.createdAt), 'dd-MM-yyyy HH:mm:ss.SSS'), updatedAt: format(new Date(singleMajor.updatedAt), 'dd-MM-yyyy HH:mm:ss.SSS')
      }));
      dispatch(
        majorActions.replaceMajorList({
          majors: majors || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const createMajor = (token, major, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/majors`;
  const postData = async () => {
    const response = await axios.post(
      url,
      { name: major.name },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not create major');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/majors`;
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
      let majors = response.data;
      majors = majors.map((singleMajor) => ({
        id: singleMajor.id, name: singleMajor.name, createdAt: format(new Date(singleMajor.createdAt), 'dd-MM-yyyy HH:mm:ss.SSS'), updatedAt: format(new Date(singleMajor.updatedAt), 'dd-MM-yyyy HH:mm:ss.SSS')
      }));
      dispatch(
        majorActions.replaceMajorList({
          majors: majors || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
