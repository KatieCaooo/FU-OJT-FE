// noinspection DuplicatedCode

const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { evaluationActions } = require('./evaluation-slice');

export const fetchEvaluationData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/evaluations`;
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
    let evaluations = response.data;
    evaluations = evaluations.map((evaluation) => ({
      id: evaluation.id, comment: evaluation.comment, grade: evaluation.grade, isPass: evaluation.isPass
    }));
    dispatch(
      evaluationActions.replaceEvaluationList({
        evaluations: evaluations || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateEvaluation = (token, evaluation, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/semesters/${evaluation.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      { comment: evaluation.comment, grade: evaluation.grade, isPass: evaluation.isPass },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not update evaluation');
    }

    return response.data;
  };

  try {
    await postData().then(async (updateRes) => {
      console.log(updateRes);
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/evaluations`;
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
      let evaluations = response.data;
      evaluations = evaluations.map((singleEvaluation) => ({
        id: singleEvaluation.id, comment: singleEvaluation.comment, grade: singleEvaluation.grade, isPass: singleEvaluation.isPass
      }));
      dispatch(
        evaluationActions.replaceEvaluationList({
          evaluations: evaluations || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const createEvaluation = (token, evaluation, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/evaluations`;
  const postData = async () => {
    const response = await axios.post(
      url,
      { comment: evaluation.comment, grade: evaluation.grade, isPass: evaluation.isPass },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not create evaluation');
    }

    return response.data;
  };

  try {
    await postData().then(async (updateRes) => {
      console.log(updateRes);
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/evaluations`;
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
      let evaluations = response.data;
      evaluations = evaluations.map((singleEvaluation) => ({
        id: singleEvaluation.id, comment: singleEvaluation.comment, grade: singleEvaluation.grade, isPass: singleEvaluation.isPass
      }));
      dispatch(
        evaluationActions.replaceEvaluationList({
          evaluations: evaluations || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
