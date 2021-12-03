const express = require('express');
const initializeMongoServer = require('./config/db');
const user = require('./routers/user');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const router = express.Router();


initializeMongoServer();
const app = express();
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(layouts)
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname, 'public/views'));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/assests', express.static(path.join(__dirname, 'public/assests')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.set('layout', 'layouts/master');


app.get("/", (req, res)=>{
    res.render('index');
});
app.use("/user", user);

app.listen(PORT, console.log(`Listning on PORT ${PORT}`));