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
      id: evaluation.id,
      studentCode: evaluation.application ? evaluation.application.student.studentCode : '',
      major: evaluation.application.student.major.name,
      job: evaluation.application.job.name,
      company: evaluation.application.job.company.name,
      comment: evaluation.comment,
      grade: evaluation.grade,
      pass: evaluation.pass
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
  const url = `${BASE_URL}/evaluations/${evaluation.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      {
        comment: evaluation.comment,
        grade: evaluation.grade,
        pass: evaluation.pass === 'Passed'
      },
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
        id: singleEvaluation.id,
        studentCode: singleEvaluation.application.student.studentCode,
        major: singleEvaluation.application.student.major.name,
        job: singleEvaluation.application.job.name,
        company: singleEvaluation.application.job.company.name,
        comment: singleEvaluation.comment,
        grade: singleEvaluation.grade,
        pass: singleEvaluation.pass
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
      { comment: evaluation.comment, grade: evaluation.grade, pass: evaluation.pass === 'Passed' },
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
        id: singleEvaluation.id,
        studentCode: singleEvaluation.application.student.studentCode,
        major: singleEvaluation.application.student.major.name,
        job: singleEvaluation.application.job.name,
        company: singleEvaluation.application.job.company.name,
        comment: singleEvaluation.comment,
        grade: singleEvaluation.grade,
        pass: singleEvaluation.pass
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
