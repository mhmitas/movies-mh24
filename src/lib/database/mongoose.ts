import mongoose from "mongoose"

// this is an incredibly common pattern used in nodeJS applications especially in serverless environments like vercel. this technique is used to Cache a database Connection in this case a mongodb connection via mongoose, across multiple invocations of serverless API routes in next.js.

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cached = global.mongoose || { conn: null, promise: null }

export const connectDB = async () => {
    if (cached.conn) return cached.conn
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        bufferCommands: false
    })

    cached.conn = await cached.promise

    return cached.conn
}