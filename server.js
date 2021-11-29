const express = require('express');
const initializeMongoServer = require('./config/db');
const login = require('./routers/login');
const ejs = require('ejs');
const path = require('path');

const router = express.Router();


initializeMongoServer();
const app = express();
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'public/views'));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/assests', express.static(path.join(__dirname, 'public/assests')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
//app.set('layout', 'layouts/layout.ejs');

app.get("/", (req, res)=>{
    res.render('index');
});
app.use("/user", login);

app.listen(PORT, console.log(`Listning on PORT ${PORT}`));