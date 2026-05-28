import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  bookingRef:    { type: String, required: true },
  passengerName: { type: String, required: true },
  email:         { type: String, required: true },
  bookedAt:      { type: Date, default: Date.now },
})

const ScheduleSchema = new mongoose.Schema({
  flightNumber:  { type: String, required: true },
  origin:        { type: String, required: true },   // ICAO code
  destination:   { type: String, required: true },   // ICAO code
  departureUTC:  { type: Date, required: true },
  arrivalUTC:    { type: Date, required: true },
  aircraft:      { type: String, required: true },
  capacity:      { type: Number, required: true },
  price:         { type: Number, required: true },
  bookings:      { type: [BookingSchema], default: [] },  // embedded!
})

export default mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema)
