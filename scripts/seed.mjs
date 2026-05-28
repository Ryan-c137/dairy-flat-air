import { MongoClient } from 'mongodb'
// import 'dotenv/config'

const client = new MongoClient(process.env.MONGODB_URI)

const airports = [
  { icao:'NZNE', name:'Dairy Flat',      city:'Auckland'        },
  { icao:'YSSY', name:'Sydney Airport',  city:'Sydney'          },
  { icao:'NZRO', name:'Rotorua Airport', city:'Rotorua'         },
  { icao:'NZGB', name:'Claris Airport',  city:'Great Barrier Is'},
  { icao:'NZCI', name:'Tuuta Airport',   city:'Chatham Islands' },
  { icao:'NZTL', name:'Lake Tekapo',     city:'Lake Tekapo'     },
]

const routes = [
  { fn:'DF101', orig:'NZNE', dest:'YSSY', days:[5],         hour:9,  min:0,  dur:210, aircraft:'SyberJet SJ30i', cap:6, price:850 },
  { fn:'DF102', orig:'YSSY', dest:'NZNE', days:[0],         hour:14, min:0,  dur:180, aircraft:'SyberJet SJ30i', cap:6, price:850 },
  { fn:'DF201', orig:'NZNE', dest:'NZRO', days:[1,2,3,4,5], hour:7,  min:0,  dur:45,  aircraft:'Cirrus SF50',    cap:4, price:180 },
  { fn:'DF202', orig:'NZRO', dest:'NZNE', days:[1,2,3,4,5], hour:8,  min:30, dur:45,  aircraft:'Cirrus SF50',    cap:4, price:180 },
  { fn:'DF203', orig:'NZNE', dest:'NZRO', days:[1,2,3,4,5], hour:16, min:30, dur:45,  aircraft:'Cirrus SF50',    cap:4, price:180 },
  { fn:'DF204', orig:'NZRO', dest:'NZNE', days:[1,2,3,4,5], hour:18, min:15, dur:45,  aircraft:'Cirrus SF50',    cap:4, price:180 },
  { fn:'DF301', orig:'NZNE', dest:'NZGB', days:[1,3,5],     hour:8,  min:0,  dur:30,  aircraft:'Cirrus SF50',    cap:4, price:120 },
  { fn:'DF302', orig:'NZGB', dest:'NZNE', days:[2,4,6],     hour:9,  min:0,  dur:30,  aircraft:'Cirrus SF50',    cap:4, price:120 },
  { fn:'DF401', orig:'NZNE', dest:'NZCI', days:[2,5],       hour:9,  min:30, dur:150, aircraft:'HondaJet Elite', cap:5, price:520 },
  { fn:'DF402', orig:'NZCI', dest:'NZNE', days:[3,6],       hour:13, min:0,  dur:150, aircraft:'HondaJet Elite', cap:5, price:520 },
  { fn:'DF501', orig:'NZNE', dest:'NZTL', days:[1],         hour:10, min:0,  dur:90,  aircraft:'HondaJet Elite', cap:5, price:290 },
  { fn:'DF502', orig:'NZTL', dest:'NZNE', days:[2],         hour:11, min:0,  dur:90,  aircraft:'HondaJet Elite', cap:5, price:290 },
]

function buildFlights() {
  const flights = []
  const today = new Date()
  for (let week = 0; week < 8; week++) {
    for (const r of routes) {
      for (const dow of r.days) {
        const d = new Date(today)
        d.setDate(today.getDate() - today.getDay() + dow + week * 7)
        d.setHours(r.hour, r.min, 0, 0)
        flights.push({
          flightNumber: r.fn,
          origin:       r.orig,
          destination:  r.dest,
          departure:    new Date(d),
          arrival:      new Date(d.getTime() + r.dur * 60000),
          aircraft:     r.aircraft,
          capacity:     r.cap,
          price:        r.price,
          bookings:     [],
        })
      }
    }
  }
  return flights
}

await client.connect()
const db = client.db()
await db.collection('airports').deleteMany({})
await db.collection('schedules').deleteMany({})
await db.collection('airports').insertMany(airports)
const flights = buildFlights()
await db.collection('schedules').insertMany(flights)
console.log(`✓ ${flights.length} flights inserted`)
await client.close()