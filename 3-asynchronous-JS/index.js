//looking into the problem of callback function
const fs = require('fs');
const superagent = require('superagent'); 
const readFilePro = file => {
    return new Promise( (resolve, reject ) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file 😨')
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise( (resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file 😨 ')
            resolve('success');
        });
    });
};

//using async/await to clean up the .then code block. This makes the code 
// look syncronous for easier reading but is asynchronous behnd the scenes
const getDogPic = async () => {

    try{
    //can have more than one await 
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

    //get dog image 
        const res1Pro = await superagent.get(
           `https://dog.ceo/api/breed/${data}/images/random`
        );

        const res2Pro = await superagent.get(
           `https://dog.ceo/api/breed/${data}/images/random`
        );  
            
        const res3Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );  

        const all = await Promise.all([res1Pro, res2Pro, res2Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs); //result of api call

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file!');
        } catch (err) {
            console.log(err);
            throw(err);
        }   
    return '2: READY 🐶';
};

(async () => {
    try {
        console.log("1. Will get dog pics!");
        const x = await getDogPic();
        console.log(x);
        console.log("3: Done getting dog pics!");
    }catch(err) {
        console.log('ERROR 💥');
    }
})();

// console.log("1. Will get dog pics!");

// //call the getDogPic funct
//  getDogPic().then(x => {
//     console.log(x)
//     console.log("3: Done getting dog pics!");
//  }).catch( err => { 
//     console.log('ERROR 💥');
//  });


// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })     //handles fulfilled promises 
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro('dog-img.txt', res.body.message);
//     })
//     .then( () => {
//         console.log('Random dog image saved to file!');
//     })
//     .catch(err => {
//         console.log(err);
//     });


//using superagent library get to return a promise
//promise implements concept of future value. 
//if multiple promises you can chain them instead of using callbacks
//a resolved promised can be fulfilled or rejected(when there was an error.)
//chaining with the .then (which fulfills the promises stops call)