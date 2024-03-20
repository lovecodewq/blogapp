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

interface UserAccount {
  email: string
  password: string
  name?: string
}
interface UserPreferences {
  darkMode: boolean
}
interface Document {
  $id?: string
  id: string
  title?: string
  content?: string
  featuredImageFileId?: string
  status?: string
  userId?: string
  slug?: string
  image: File[]
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

  async getCurrentUser(): Promise<Models.User<UserPreferences> | null> {
    try {
      return await this.account.get()
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser() :: ', error)
    }
    return null
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log('Appwrite service :: logout() :: ', error)
    }
  }

  // document
  async getDocument(documentId: string): Promise<Models.Document | void> {
    try {
      const res = await this.databases.getDocument(
        conf.databaseId,
        conf.collectionId,
        documentId
      )
      return res
    } catch (error) {
      console.log('Appwrite service :: getDocument :: ', error)
    }
  }

  async listDocuments(
    queries = [Query.equal('status', ['active'])]
  ): Promise<Models.DocumentList<Models.Document> | void> {
    try {
      const respose = await this.databases.listDocuments(
        conf.databaseId,
        conf.collectionId,
        queries
      )
      return respose
    } catch (error) {
      console.log('Appwrite service :: listDocuments :: ', error)
    }
  }

  async creatDocument({
    title,
    content,
    featuredImageFileId,
    status,
    userId,
  }: Models.Document): Promise<Models.Document | void> {
    try {
      const respose = await this.databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        ID.unique(),
        { title, content, featuredImageFileId, status, userId }
      )
      return respose
    } catch (error) {
      console.log('Appwrite service :: createDocument :: ', error)
    }
  }

  async updateDocument(
    $id: string,
    document: Models.Document
  ): Promise<Models.Document | void> {
    try {
      const res = await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        $id,
        document
      )
      return res
    } catch (error) {
      console.log('Appwrite service :: updateDocument :: ', error)
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
      return false
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
      return false
    }
  }

  getFilePreview(fileId: string): string {
    return this.storage.getFilePreview(conf.bucketId, fileId).href
  }
}

const service = new Service()

export type { Document }
export default service
