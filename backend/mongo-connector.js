const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://mongo:27017/hackernews';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {
    Links: db.collection('links'),
  }
};