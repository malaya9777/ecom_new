const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res)=>{
    res.json({message:"API working!"});
});

app.listen(PORT, console.log(`Listning on PORT ${PORT}`));