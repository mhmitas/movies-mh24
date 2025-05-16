import mongoose, { Mongoose } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

type MongooseCache = {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
    mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

export const connectDB = async () => {
    if (cached.conn) return cached.conn
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: 'sample_mflix',
    })

    cached.conn = await cached.promise

    return cached.conn
}