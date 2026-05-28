import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

if (!global._mongo) {
  global._mongo = client.connect()
}

export default global._mongo