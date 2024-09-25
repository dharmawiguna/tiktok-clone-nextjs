import { Account, Client, ID, Databases, Query, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66f421f60023c8e0c60e");

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID };
