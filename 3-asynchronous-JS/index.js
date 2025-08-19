//looking into the problem of callback function
const fs = require('fs');
const superagent = require('superagent'); 
const readFilePro = file => {
    return new Promise( (resolve, reject ) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file :(')
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise( (resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file :( ')
            resolve('success');
        });
    });
};


readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })     //handles fulfilled promises 
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then( () => {
        console.log('Random dog image saved to file!');
    })
    .catch(err => {
        console.log(err);
    });


//using superagent library get to return a promise
//promise implements concept of future value. 
//if multiple promises you can chain them instead of using callbacks
//a resolved promised can be fulfilled or rejected(when there was an error.)
//chaining with the .then (which fulfills the promises stops call)