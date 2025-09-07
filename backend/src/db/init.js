import mongoose from 'mongoose'

export async function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL // or MONGODB_URI
  if (!DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set, skipping DB connection')
    return
  }

  try {
    await mongoose.connect(DATABASE_URL)
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('Error connecting to database:', err)
    process.exit(1) // optional: crash if DB is required
  }

  mongoose.connection.on('open', () => {
    console.info('Successfully connected to database:', DATABASE_URL)
  })

  return mongoose.connection
}
