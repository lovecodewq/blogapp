import { Models } from 'appwrite'

export interface BlogPost extends Models.Document {
  title: string
  featuredImageFileId: string
  userId: string
  content: string
  status: string
}
