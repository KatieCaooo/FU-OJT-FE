const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { companyActions } = require('./company-slice');

export const fetchCompaniesData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/companies`;
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
    let companies = response.data;
    companies = companies.map((company) => ({
      id: company.id, name: company.name, description: company.description, address: company.address
    }));
    dispatch(
      companyActions.replaceCompanyList({
        companies: companies || [],
        totalQuantity: response.totalElements
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = (token, company, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/companies/${company.id}`;
  const postData = async () => {
    const response = await axios.put(
      url,
      { name: company.name, description: company.description, address: company.address },
      {
        headers: getRequiredAuthenHeader(token)
      }
    );

    if (response.status !== 200) {
      throw new Error('Could not update company');
    }

    return response.data;
  };

  try {
    await postData().then(async (updateRes) => {
      console.log(updateRes);
      const fetchData = async () => {
        const fetchUrl = `${BASE_URL}/companies`;
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
      let companies = response.data;
      companies = companies.map((singleCompany) => ({
        id: singleCompany.id, name: singleCompany.name, description: singleCompany.description, address: singleCompany.address,
      }));
      dispatch(
        companyActions.replaceCompanyList({
          companies: companies || [],
          totalQuantity: response.totalElements
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};
