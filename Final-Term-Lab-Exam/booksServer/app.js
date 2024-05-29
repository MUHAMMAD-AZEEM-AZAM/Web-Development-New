require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejsLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const path = require('path');
const session=require('express-session')

const storiesAdminRouter = require('./routes/adminStories')
const adminRouter = require('./routes/admin')
const landingPageRouter = require('./routes/landingPage')
const storiesRouter=require('./routes/stories')
const gamesRouter=require('./routes/games')
const canvasRouter=require('./routes/canvas')
const authRouter=require('./routes/authWithSession')
const productRouter=require('./routes/products')

const app = express();

// Middleware to enable CORS
app.use(cors());

app.use(bodyParser.json());
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ejsLayouts)
app.use(cookieParser());
//save and resave are false as depreciated
app.use(session({secret:"KidsApp Secret is Fun",saveUninitialized: false,resave: false,}))
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set('layout', 'layouts/layout');

// Routes
app.use('/',landingPageRouter);

app.use('/api/stories', storiesAdminRouter)

app.use('/admin',adminRouter)

app.use('/stories',storiesRouter)

app.use('/games',gamesRouter)

app.use('/canvas',canvasRouter)

app.use('/auth',authRouter)

app.use('/products',productRouter)

//mongogDB connection using mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to the database and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // exit the process if the connection fails
  });
