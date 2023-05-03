import mongoose from 'mongoose';

if (!process.env.MONGO_URI)
  throw new Error('Please add mongodb uri in the env file');

const DB_URL = process.env.MONGO_URI;

const globalWithMongoose = global as typeof globalThis & {
  mongoose: { connection: any; promise: any };
};

let cached = globalWithMongoose.mongoose;

if (!cached)
  // eslint-disable-next-line no-multi-assign
  cached = globalWithMongoose.mongoose = { connection: null, promise: null };

export default async function connectDB() {
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(DB_URL, options)
      .then((mongooseDB) => {
        // eslint-disable-next-line no-console
        console.log('Connected to tbe DB');
        return mongooseDB;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }
  cached.connection = await cached.promise;
  return cached.connection;
}
