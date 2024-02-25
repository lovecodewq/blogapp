import { Account, Client, Databases, ID, Query, Storage } from 'appwrite'

import conf from '../conf/conf'

interface UserAccount {
  email: string
  password: string
  name?: string
}
interface Document {
  $id:string
  id: string
  title: string
  content: string
  featuredImage: string
  status: string
  userId: string
  slug: string
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
  async createAccount({ email, password, name }: UserAccount): Promise<any> {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )
      console.log(response)
      if (response) {
        return this.login({ email, password })
      } else {
        return response
      }
    } catch (error) {
      throw error
    }
  }

  async login({ email, password }: UserAccount): Promise<any> {
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
      console.log('Appwrite service :: getCurrentUser() :: ', error)
    }
    return null
  }
  async logout(): Promise<any> {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log('Appwrite service :: logout() :: ', error)
    }
  }

  // document
  async getDocument(documentId: string): Promise<any> {
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
  ): Promise<any> {
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
    id,
    title,
    content,
    featuredImage,
    status,
    userId,
  }: Document): Promise<any> {
    try {
      const respose = await this.databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        id,
        { title, content, featuredImage, status, userId }
      )
      return respose
    } catch (error) {
      console.log('Appwrite service :: listDocuments :: ', error)
    }
  }
  async updateDocument(
    id: string,
    { title, content, featuredImage, status }: Omit<Document, 'id' | 'userId'>
  ): Promise<any> {
    try {
      const res = await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        id,
        { title, content, featuredImage, status }
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
  async createFile(file: File): Promise<any> {
    try {
      return await this.storage.createFile(conf.bucketId, ID.unique(), file)
    } catch (error) {
      console.log('Appwrite service :: createFile() :: ', error)
      return false
    }
  }

  async deleteFile(fileId: string): Promise<any> {
    try {
      return await this.storage.deleteFile(conf.bucketId, fileId)
    } catch (error) {
      console.log('Appwrite service :: deleteFile() :: ', error)
      return false
    }
  }

  getFilePreview(fileId: string): any {
    return this.storage.getFilePreview(conf.bucketId, fileId).href
  }
}

const service = new Service()

export type { Document }
export default service
