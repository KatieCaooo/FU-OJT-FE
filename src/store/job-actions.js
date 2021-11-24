const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { jobActions } = require('./job-silce');

export const fetchJobsData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/jobs`;
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
    const jobs = response.data;
    dispatch(
      jobActions.replaceJobList({
        jobs: jobs || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = (token, job, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/jobs/${job.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      {
        name: job.name,
        title: job.title,
        salary: job.salary,
        description: job.description,
      },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not update job');
    }

    return response.data;
  };

  try {
    await postData().then(async (updateRes) => {
      console.log(updateRes);
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/jobs`;
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
      let jobs = response.data;
      jobs = jobs.map((singleJob) => ({
        id: singleJob.id,
        name: singleJob.name,
        title: singleJob.title,
        salary: singleJob.salary,
        description: singleJob.description,
      }));
      dispatch(
        jobActions.replaceJobList({
          jobs: jobs || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteJob = (token, job, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/jobs/${job.id}`;
  const postData = async () => {
    const response = await axios.delete(
      url,
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not delete job');
    }

    return response.data;
  };

  try {
    await postData().then(async () => {
      const fetchData = async (deleteResponse) => {
        console.log(deleteResponse);
        const fetchUrl = `${BASE_URL}/jobs`;
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
      let jobs = response.data;
      jobs = jobs.map((singleJob) => ({
        id: singleJob.id,
        name: singleJob.name,
        title: singleJob.title,
        salary: singleJob.salary,
        topReasons: singleJob.topReasons,
        description: singleJob.description,
        aboutOurTeam: singleJob.aboutOurTeam,
        responsibilities: singleJob.responsibilities,
        mustHaveSkills: singleJob.mustHaveSkills,
        niceToHaveSkills: singleJob.niceToHaveSkills,
        whyYouWillLove: singleJob.whyYouWillLove,
        benefits: singleJob.benefits,
        semesters: singleJob.semestersId,
        majors: singleJob.majors.id,
      }));
      dispatch(
        jobActions.replaceJobList({
          jobs: jobs || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
