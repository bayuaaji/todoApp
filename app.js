const express = require('express')
const app = express()
const routes = require('./routes')

const port = 9001

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use("/api/v1", routes);


app.listen(port, ()=>{console.log("app is running on port", port)})
