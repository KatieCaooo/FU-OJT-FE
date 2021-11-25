const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { applicationActions } = require('./application-slice');

export const fetchApplicationData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
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
      id: application.id,
      studentCode: application.student.studentCode,
      major: application.student.major.name,
      experience: application.experience,
      jobId: application.job.id,
      job: application.job.name,
      company: application.job.company.name,
      companyAccepted: application.companyAccepted,
      studentConfirmed: application.studentConfirmed,
      schoolDenied: application.schoolDenied,
      attachments: application.attachments
    }));
    dispatch(
      applicationActions.replaceApplicationList({
        applications: applications || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateApplication = (token, application, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/applications/${application.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      {
        experience: application.experience,
        attachments: application.attachments,
        jobId: application.job,
        companyAccepted: application.companyAccepted === 'Accepted',
        studentConfirmed: application.studentConfirmed === 'Accepted'
      },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not update application');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/applications`;
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
      let applications = response.data;
      applications = applications.map((singleApplication) => ({
        id: singleApplication.id,
        studentCode: singleApplication.student.studentCode,
        major: singleApplication.student.major.name,
        experience: singleApplication.experience,
        jobId: singleApplication.job.id,
        job: singleApplication.job.name,
        company: singleApplication.job.company.name,
        companyAccepted: singleApplication.companyAccepted,
        studentConfirmed: singleApplication.studentConfirmed,
        schoolDenied: singleApplication.schoolDenied,
        attachments: singleApplication.attachments
      }));
      dispatch(
        applicationActions.replaceApplicationList({
          applications: applications || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const createApplication = (token, application, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/applications`;
  const postData = async () => {
    const response = await axios.post(
      url,
      {
        experience: application.experience,
        jobId: application.job.id,
        accountId: application.student.id
      },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not create application');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/applications`;
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
      let applications = response.data;
      applications = applications.map((singleApplication) => ({
        id: singleApplication.id,
        studentCode: singleApplication.student.studentCode,
        major: singleApplication.student.major.name,
        experience: singleApplication.experience,
        jobId: singleApplication.job.id,
        job: singleApplication.job.name,
        company: singleApplication.job.company.name,
        companyAccepted: singleApplication.companyAccepted,
        studentConfirmed: singleApplication.studentConfirmed,
        schoolDenied: singleApplication.schoolDenied,
        attachments: singleApplication.attachments
      }));
      dispatch(
        applicationActions.replaceApplicationList({
          applications: applications || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteApplication = (token, application, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/applications/${application.id}`;
  const postData = async () => {
    const response = await axios.delete(
      url,
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not delete application');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/applications`;
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
      let applications = response.data;
      applications = applications.map((singleApplication) => ({
        id: singleApplication.id,
        studentCode: singleApplication.student.studentCode,
        major: singleApplication.student.major.name,
        experience: singleApplication.experience,
        jobId: singleApplication.job.id,
        job: singleApplication.job.name,
        company: singleApplication.job.company.name,
        companyAccepted: singleApplication.companyAccepted,
        studentConfirmed: singleApplication.studentConfirmed,
        schoolDenied: singleApplication.schoolDenied,
        attachments: singleApplication.attachments
      }));
      dispatch(
        applicationActions.replaceApplicationList({
          applications: applications || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
