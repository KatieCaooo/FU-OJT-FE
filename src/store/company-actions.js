const { BASE_URL, getRequiredAuthenHeader } = require('src/api/config');
const axios = require('axios');
const { companyActions } = require('./company-slice');

export const fetchCompaniesData = (token, pageNo, pageSize, sortBy, search) => async (dispatch) => {
  const url = `${BASE_URL}/companies`;
  const fetchData = async () => {
    const response = await axios.get(url, {
      params: {
        search: `companies.id > 0${search && search !== '' ? `;${search}` : ''}`, pageSize, pageNo, sortBy
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
    const companies = response.data;
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

export const sendCompanyData = () => {};
