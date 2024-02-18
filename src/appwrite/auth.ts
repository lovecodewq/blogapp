import {Account, Client, ID} from 'appwrite';

import conf from '../conf/conf';

interface UserAccount {
  email: string;
  password: string;
  name?: string;
}

export class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client();
    console.log(conf.endpoint);
    console.log(conf.projectId);
    this.client.setEndpoint(conf.endpoint).setProject(conf.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}: UserAccount): Promise<any> {
    try {
      const response =
          await this.account.create(ID.unique(), email, password, name);
      console.log(response);
      if (response) {
        return this.login({email, password});
      } else {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email, password}: UserAccount): Promise<any> {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      throw error
    }
  }
  async getCurrentUser(): Promise<any> {
    try {
      return await this.account.get()
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser() :: ', error);
    }
    return null;
  }
  async logout(): Promise<any> {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log('Appwrite service :: logout() :: ', error);
    }
  }
}

const authService = new AuthService()

export default authService