const express = require('express');
var exphbs  = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('./db/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const templateRoutes = require('./routes/templateRoutes');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(userRoutes);
app.use(categoryRoutes);
app.use(serviceRoutes);
app.use(templateRoutes);


app.listen(PORT, () => console.log(`Server up and running at PORT ${PORT}`));
