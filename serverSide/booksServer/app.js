require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const storiesAdminRouter = require('./routes/adminStories')
let ejsLayouts = require("express-ejs-layouts");
const adminRouter = require('./routes/admin')
const landingPageRouter = require('./routes/landingPage')
const storiesRouter=require('./routes/stories')
const gamesRouter=require('./routes/games')
const canvasRouter=require('./routes/canvas')
const path = require('path');

const app = express();

// Middleware to enable CORS
app.use(cors());

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(ejsLayouts)
app.set('layout', 'layouts/layout');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/',landingPageRouter);

app.use('/api/stories', storiesAdminRouter)

app.use('/admin',adminRouter)

app.use('/stories',storiesRouter)

app.use('/games',gamesRouter)

app.use('/canvas',canvasRouter)


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
