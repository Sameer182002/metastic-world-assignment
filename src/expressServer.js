const { app } = require("../server.js")

app.use('/user',require("./routes/userRoute.js"))
app.get("/",(req,res)=>res.send("Service is running"))
module.exports = app