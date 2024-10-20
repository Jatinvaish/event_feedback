import mongoose from 'mongoose';  
  
const MONGO_URI = process.env.MONGODB_URI;  
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};  
export async function connectToDatabase() {  
    if (!MONGO_URI) {  
        throw new Error('Please define the MONGO_URI environment variable inside .env.local');  
    }  
    if (cached.connection) {  
        return cached.connection;  
    }  
    if (!cached.promise) {  
        const opts = {  
            bufferCommands: false,  
        };  
        cached.promise = mongoose.connect(MONGO_URI, opts);  
    }  
    try {  
        cached.connection = await cached.promise;  
    } catch (e) {  
        cached.promise = undefined;  
        throw e;  
    }  
    return cached.connection;  
}  
