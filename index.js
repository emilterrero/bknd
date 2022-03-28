// Import Mongoose library
let mongoose = require('mongoose')

// Connect to MongoDB
let mongooseConfig = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect("mongodb://127.0.0.1:27017/bknd", mongooseConfig)

// Setup event listeners for our Mongoose Connection
mongoose.connection.on("connected", () => console.log("Connected to database"))
mongoose.connection.on("disconnected", () => console.log("Disconnected from database"))
mongoose.connection.on("error", error => console.error("Database error", error))

// Create Mongoose Model
let RollerCoaster = mongoose.model('RollerCoaster', new mongoose.Schema({
    name: String,
    year: Number,
    speed: Number
}))

// Import Express
let express = require('express')

//Make a new Express App
let app = express()

// Let app parse JSON in HTTP request bodies
app.use(express.json())

// Create 
app.post('/roller-coaster', (request, response) => {
    let rollerCoaster = request.body
    RollerCoaster 
    .create(rollerCoaster)
    .then(newRollerCoaster => response.json(newRollerCoaster))
})

//Read One by ID 
app.get('/roller-coaster/:id', (request, response) => {
    let rollerCoaster = request.params.id
    RollerCoaster 
    .findById(rollerCoaster)
    .then(rollerCoaster => response.json(rollerCoaster))
})

// Read All
app.get('/roller-coaster/', (request, response) => {
    RollerCoaster 
    .find()
    .then(rollerCoasters=> response.json(rollerCoasters))
})

// Update 
app.put('/roller-coaster/:id', (request, response) => {
    let rollerCoasterId = request.params.id
    let newRollerCoasterData = request.body
    RollerCoaster 
    .findByIdAndUpdate(rollerCoasterId, newRollerCoasterData, {new: true})
    .then((newUpdatedRollerCoaster) => response.send(newUpdatedRollerCoaster))
})

// Delete 
app.delete('/roller-coaster/:id', (request, response) => {
    let rollerCoasterId = request.params.id
    RollerCoaster 
    .findByIdAndRemove(rollerCoasterId)
    .then(() => response.json({success: true}))
})

// Create Server, listen on port 9000
const PORT = 9000
let server = app.listen(PORT) 
server.on('listening', ()=> console.log("Listening on port " + PORT))
server.on('error', error=> console.error("error", error))

