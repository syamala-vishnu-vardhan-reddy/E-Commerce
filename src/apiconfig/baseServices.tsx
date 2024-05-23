import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export default class BaseService {
  axiosInstance: AxiosInstance;
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000, 
    });

    this.axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response: AxiosResponse) {
    return response.data;
  }

  handleError(error: AxiosError) {
    // Customize error handling as needed
    console.error('Request failed:', error.message);
    throw new Error('Request failed'); 
  }

  async get(url: string, params?: any) {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(url: string, data?: any) {
    try {
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(url: string, data?: any) {
    try {
      const response = await this.axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(url: string) {
    try {
      const response = await this.axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
