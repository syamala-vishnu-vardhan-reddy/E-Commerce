// services.ts
import BaseService from '../../../apiconfig/baseServices';

export default class AuthService extends BaseService {

  constructor(baseURL: string) {
    super(baseURL);
  }

  async login(requestBody: any) {
    try {
      const response = await this.post('/api/auth/signIn', requestBody);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async signup(requestBody: any) {
    try {
      const response = await this.post('/api/auth/signup', requestBody);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  }

}
