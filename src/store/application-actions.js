const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { applicationActions } = require('./application-slice');

export const fetchEvaluationData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/applications`;
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
    let applications = response.data;
    applications = applications.map((application) => ({
      id: application.id, student: application.student.studentCode, major: application.majors.name,
      experience: application.experience, job: application.job.name, company: application.company.name,
      companyAccepted: application.companyAccepted, studentConfirmed: application.studentConfirmed
    }));
    dispatch (
      applicationActions.replaceApplicationList({
        applications: applications || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};
