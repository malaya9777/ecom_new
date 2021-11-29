const express = require('express');
const bodyParser = require('body-parser');
const initializeMongoServer = require('./config/db');
const user = require('./routers/login');

const router = express.Router();


initializeMongoServer();
const app = express();
app.use(bodyParser.json)

const PORT = process.env.PORT || 8000;

app.get("/", (req, res)=>{
    res.json({message:"API working!"});
});

app.listen(PORT, console.log(`Listning on PORT ${PORT}`));