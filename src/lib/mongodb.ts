import { MongoClient } from 'mongodb';

if (!process.env.MONGO_URI) throw new Error('Please include mongo uri ');

const uri = process.env.MONGO_URI;
let client: MongoClient;
// eslint-disable-next-line import/no-mutable-exports
let clientPromise: Promise<MongoClient> | undefined;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongoClientPromise = global as typeof globalThis & {
    mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise.mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongoClientPromise.mongoClientPromise = client.connect();
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default clientPromise;
