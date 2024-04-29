const express = require("express") // imports
const mongoose = require("mongoose")
const cors =  require("cors")


//connection
const dburl = "mongodb://localhost:27017/sdp"
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
}); //mongodb connection


const app = express()
app.use(cors()) // cross origin resource sharing // to prevent blocking using urls
app.use(express.json()) // to parse JSON data

const adminrouter = require("./routes/adminroutes")
const customerrouter = require("./routes/customerroutes")
const sellerrouter = require("./routes/sellerroutes")

app.use("",adminrouter) // to include all admin routes
app.use("",customerrouter) // to include all job seeker routes
app.use("",sellerrouter) // to include all job seeker routes




const port = 2014
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})