import 'dotenv/config';

const ORIGIN = '*'
const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI
const MONGO_OPTIONS = {}
const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'
const JWT_EXPIRES_IN: number  =  12 // hours
const JWT_REFRESH_EXPIRES_IN: number = 15 // days

export { ORIGIN, PORT, MONGO_URI, MONGO_OPTIONS, JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN }
