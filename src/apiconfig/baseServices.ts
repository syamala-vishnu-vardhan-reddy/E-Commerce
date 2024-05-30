import axios from "axios";

export default function BaseService() {}
const baseURL = "http://localhost:5000/api";
const userInfoJsonObject = localStorage.getItem("user")
  ? localStorage.getItem("user")
  : "";

const userInfoParsedObject = userInfoJsonObject
  ? JSON.parse(userInfoJsonObject)
  : null;

const accessToken = userInfoParsedObject?.jwtToken?.accessToken;
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};
console.log(config);
const getData = async (url: string) => {
  try {
    url = baseURL + url;
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url: string, data?: any) => {
  try {
    url = baseURL + url;
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (url: string, data?: any) => {
  try {
    url = baseURL + url;
    const response = await axios.put(url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (url: string) => {
  try {
    url = baseURL + url;
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getData, postData, updateData, deleteData };
