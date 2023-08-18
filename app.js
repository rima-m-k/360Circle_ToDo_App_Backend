const express = require('express')
const dotenv = require("dotenv");
const dbconnect = require("./src/config/dbConnect");
const corsMiddleware = require('./src/middlewares/cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");


dotenv.config();
const PORT = process.env.PORT || 8080;

dbconnect.dbconnect();
const user = require("./src/routes/user");

const app = express()
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(
	session({
	  secret: "its a secret",
	  resave: false,
	  saveUninitialized: true,
	  maxAge: 60000,
	  cookie: {
		secure: false, // Set to true if using HTTPS
		httpOnly: true,
	  }
	})
  );
  
  
app.use("/", user);

app.listen(PORT, (error) =>{
	if(!error)
		console.log("listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);