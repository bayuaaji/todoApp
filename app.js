const express = require('express')
const app = express()
const routes = require('./routes')

const port = 4000

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use("/v1", routes);


app.listen(port, ()=>{console.log("app is running on port", port)})