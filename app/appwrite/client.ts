import { Account, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  endpointUrl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  apiKey: import.meta.env.VITE_APPWRITE_SECRET_KEY,
  databaseId: import.meta.env.VITE_APPWRITE_Database_key,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_KEY,
  tripCollectionId: import.meta.env.VITE_APPWRITE_TRIP_COLLECTION_KEY,
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);

const database = new Databases(client);

const storage = new Storage(client);

export { client, account, database, storage };
