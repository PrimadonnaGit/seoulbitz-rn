import axios from "axios";

const makeGetRequest = (path, params) => 
  axios.get(`https://seoulbitz.sparker.kr:1323${path}`, {
    params: {
      ...params,
    },
  });

const makePostRequest = (path, form) => 
  axios.post(`https://seoulbitz.sparker.kr:1323${path}`, form);


const getData = async (path, params = {}) => {
  try {
    const { data } = await makeGetRequest(path, params);
    return [data, null];
  } catch (e) {
    console.log(e, e.response)
    return [null, e];
  }
};

const postData = async (path, params = {}) => {
  let form = new FormData() 
  form.append('subway', params.subway);
  try {
    const { data } = await makePostRequest(path, form);
    return [data, null];
  } catch (e) {
    console.log(e, e.response)
    return [null, e];
  }
};

export const seoulbitzApi = {
  getFoodie: () => getData("/getData/place/all"),
  // getShop: () => getData("/getData/shop"),
  // getSubway: () => getData("/getData/subway"),

  getNearFoodie: (subway) => postData('/getNear/place', {'subway':subway}),
  // getNearShop: (subway) => postData('/getNear/shop', {'subway':subway}),
};
