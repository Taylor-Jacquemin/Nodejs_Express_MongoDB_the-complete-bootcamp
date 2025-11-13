const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });


//gets environment variable (global variable used for enviornment in which node app is running)
//console.log(app.get('env'));
//allows setting of env variables with call NODE_ENV=development nodemon server.js
//console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
//if not related to express its done outside the app file 
//environment variables




