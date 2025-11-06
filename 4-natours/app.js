const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1.MIDDLEWARES. (a function to modify incoming request data) the data from body is added to the request object
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next(); //if you don't call next() the response cycle is stopped here
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// 3. ROUTES 
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);
    
module.exports = app;
