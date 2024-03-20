interface AppwriteConfig {
  endpoint: string
  projectId: string
  databaseId: string
  collectionId: string
  bucketId: string
  tinymceAPIKey: string
}

const conf: AppwriteConfig = {
  endpoint: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinymceAPIKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default conf
