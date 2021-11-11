const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { jobActions } = require('./job-silce');

export const fetchJobsData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/jobs`;
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
    let jobs = response.data;
    jobs = jobs.map((job) => ({
      id: job.id, name: job.name, title: job.title, description: job.description, skills: job.skills, benefits: job.benefits
    }));
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
        description: job.description,
        skills: job.skills,
        benefits: job.benefits
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
        description: singleJob.description,
        skills: singleJob.skills,
        benefits: singleJob.benefits,
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
