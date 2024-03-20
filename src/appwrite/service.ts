import {
  Account,
  Client,
  Databases,
  ID,
  Query,
  Storage,
  Models,
  AppwriteException,
} from 'appwrite'

import conf from '../conf/conf'
import { BlogPost } from '../types/blogTypes'

interface UserAccount {
  email: string
  password: string
  name?: string
}
interface UserPreferences {
  darkMode: boolean
}

class Service {
  private client: Client
  private account: Account
  private databases: Databases
  private storage: Storage

  constructor() {
    this.client = new Client()
    this.client.setEndpoint(conf.endpoint).setProject(conf.projectId)
    this.account = new Account(this.client)
    this.databases = new Databases(this.client)
    this.storage = new Storage(this.client)
  }

  // account
  async createAccount({
    email,
    password,
    name,
  }: UserAccount): Promise<
    Models.User<UserPreferences> | Promise<Models.Session> | void
  > {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )
      if (response) {
        return this.login({ email, password })
      } else {
        console.log(response)
        return response
      }
    } catch (error) {
      console.log('Appwrite service :: createAccount :: ', error)
      throw error
    }
  }

  async login({ email, password }: UserAccount): Promise<Models.Session> {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      const appwriteError = error as AppwriteException
      throw appwriteError
    }
  }

  async getCurrentUser(): Promise<Models.User<UserPreferences>> {
    try {
      return await this.account.get()
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser() :: ', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log('Appwrite service :: logout() :: ', error)
      throw error
    }
  }

  // document
  async getBlogPost(documentId: string): Promise<BlogPost> {
    try {
      const res = await this.databases.getDocument<BlogPost>(
        conf.databaseId,
        conf.collectionId,
        documentId
      )
      return res
    } catch (error) {
      console.log('Appwrite service :: getDocument :: ', error)
      throw error
    }
  }

  async listBlogPosts(
    queries = [Query.equal('status', ['active'])]
  ): Promise<Models.DocumentList<BlogPost>> {
    try {
      const respose = await this.databases.listDocuments<BlogPost>(
        conf.databaseId,
        conf.collectionId,
        queries
      )
      return respose
    } catch (error) {
      console.log('Appwrite service :: listDocuments :: ', error)
      throw error
    }
  }

  async creatPost({
    title,
    content,
    featuredImageFileId,
    status,
    userId,
  }: BlogPost): Promise<BlogPost> {
    try {
      const respose = await this.databases.createDocument<BlogPost>(
        conf.databaseId,
        conf.collectionId,
        ID.unique(),
        { title, content, featuredImageFileId, status, userId }
      )
      return respose
    } catch (error) {
      console.log('Appwrite service :: createDocument :: ', error)
      throw error
    }
  }

  async updateDocument($id: string, document: BlogPost): Promise<BlogPost> {
    try {
      const res = await this.databases.updateDocument<BlogPost>(
        conf.databaseId,
        conf.collectionId,
        $id,
        document
      )
      return res
    } catch (error) {
      console.log('Appwrite service :: updateDocument :: ', error)
      throw error
    }
  }

  async deleteDocument(id: string): Promise<boolean> {
    try {
      const res = await this.databases.deleteDocument(
        conf.databaseId,
        conf.collectionId,
        id
      )
      console.log(res)
      return true
    } catch (error) {
      console.log('Appwrite service :: deleteDocument :: ', error)
      throw error
    }
  }

  // storage
  async createFile(file: File): Promise<Models.File> {
    try {
      return await this.storage.createFile(conf.bucketId, ID.unique(), file)
    } catch (error) {
      console.log('Appwrite service :: createFile() :: ', error)
      throw error
    }
  }

  async deleteFile(fileId: string): Promise<{} | boolean> {
    try {
      return await this.storage.deleteFile(conf.bucketId, fileId)
    } catch (error) {
      console.log('Appwrite service :: deleteFile() :: ', error)
      throw error
    }
  }

  getFilePreview(fileId: string): string {
    return this.storage.getFilePreview(conf.bucketId, fileId).href
  }
}

const service = new Service()

export default service
