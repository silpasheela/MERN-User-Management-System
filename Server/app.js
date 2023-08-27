const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const connectDB = require('./config/connect');


require('dotenv').config()

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//COOKIE PARSER
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//CROSS ORIGIN RESOURCE SHARING
const cors = require('cors');
app.use(cors({credentials: true , origin: 'http://localhost:3000'}));


const fileupload = require('express-fileupload');
app.use(fileupload({useTempFiles: true , tempFileDir:'/temp/'}));


const adminRouter = require('./routes/adminRoutes')
app.use('/admin',adminRouter)

const userRouter = require('./routes/userRoutes')
app.use('/',userRouter)



connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
})
.catch((error)=> {
    console.log('Cannot connect to the Server',error);
})
