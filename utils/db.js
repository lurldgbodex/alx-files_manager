const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const dbUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const usersCollection = this.client.db().collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    const filesCollection = this.client.db().collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
