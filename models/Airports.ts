import mongoose from 'mongoose'

const AirportSchema = new mongoose.Schema({
  icao:     { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  city:     { type: String, required: true },
  timezone: { type: String, required: true },
})

export default mongoose.models.Airport || mongoose.model('Airport', AirportSchema)
