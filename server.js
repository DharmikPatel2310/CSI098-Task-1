// following is the es modules declaration style in nodejs
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// import products from "./data/"
// const express = require('express')

const connectDB = require('./backend/config/db');
// const connectDB = require('./backend/config/db.js');
// import items from './data/Data.js'
const Dashboard = require('./backend/models/dashboardModel.js');
// import classes from './data/ClassData.js'
const studentRoutes = require('./backend/routes/studentRoutes.js');
const adminRoutes = require('./backend/routes/adminRoutes.js');
const teacherRoutes = require('./backend/routes/teacherRoutes.js');
const staffRoutes = require('./backend/routes/staffRoutes.js');
// const items = require('./data/Data')
// const classes = require('./data/ClassData')
// d0t
// console.log("**********************");`
const PORT = process.env.PORT || 8080;
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.get('/dashboard', async(req, res) => {
    const items = await Dashboard.find()
    console.log(items)
    res.json(items)
})

app.use('/api/students', studentRoutes)
app.use('/api/login', adminRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/staffs', staffRoutes)
app.get('/api/config/cloudinary', (req, res) => {
    res.send(process.env.CLOUDINARY_URL)
})
app.get('/api/config/cloudinarypreset', (req, res) => {
    res.send(process.env.CLOUDINARY_UPLOAD_PRESET)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// const __dirname = path.resolve()
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend/build')))
//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     )
// } else {
//     app.get('/', async(req, res) => {
//         res.send('API is running...')
//     })
// }

//the following router is for displaying the class labels

//following route is for displaying the list of students
//according to the classses

//following route will only be used in case the error is encountered.
//FOLLOWING IS THE FALL BACK ROUTE for url not listed in the backend folder
// app.use((req, res, next) => {
//     const error = new Error(`Not found -${req.originalUrl}`)
//     res.status(404)
//     next(error)
// })
// app.use((err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode
//     res.status(statusCode)
//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     })
// })
// const PORT = process.env.PORT || 5000
// app.listen(PORT, console.log(`Server running on port ${PORT}`))