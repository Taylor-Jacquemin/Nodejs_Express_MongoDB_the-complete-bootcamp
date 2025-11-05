const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
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

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. ROUTE HANDLERS
const getAllTours = (req, res)=> {
    console.log(req.requestTime);

    res.status(200).json({
        status:'success', 
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params);
    //when multiply string that looks like num by a num it will convert the string to a num
    const id = req.params.id * 1;  
    const tour = tours.find(el => el.id === id);

    //if(id > tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status:'success', 
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {
    //console.log(req.body);
    
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

const updateTour = (req, res) => {
    
    if(req.params.id *1  > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

const deleteTour = (req, res) => {
    if(req.params.id *1  > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
//204 means no content
    res.status(204).json({
        status: 'success',
        data: null
    });
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    })
};

//restructuring part 1<--separated handlers to be exported to another file later
//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

//restructuring part 2<--easier to read plus we don't want to have to change 
//data in all 5 places if url changes


// 3. ROUTE
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app 
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/api/vq/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
    
// 4. SERVER    
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);

});
