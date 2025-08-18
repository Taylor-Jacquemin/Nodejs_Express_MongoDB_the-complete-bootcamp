console.log(arguments);
//proof that modules are wrapped 
//[Arguments] {
//   '0': {},
//   '1': [Function: require] {
//     resolve: [Function: resolve] { paths: [Function: paths] },
//     main: {
//       id: '.',
//       path: 'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works',
//       exports: {},
//       filename: 'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works\\modules.js',
//       loaded: false,
//       children: [],
//       paths: [Array],
//       [Symbol(kIsMainSymbol)]: true,
//       [Symbol(kIsCachedByESMLoader)]: false,
//       [Symbol(kURL)]: undefined,
//       [Symbol(kFormat)]: undefined,       
//       [Symbol(kIsExecuting)]: true        
//     },
//     extensions: [Object: null prototype] {
//       '.js': [Function (anonymous)],      
//       '.json': [Function (anonymous)],    
//       '.node': [Function (anonymous)]     
//     },
//     cache: [Object: null prototype] {     
//       'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works\\modules.js': [Object]
//     }
//   },
//   '2': {
//     id: '.',
//     path: 'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works',
//     exports: {},
//     filename: 'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works\\modules.js',
//     loaded: false,
//     children: [],
//     paths: [
//       'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works\\node_modules',    
//       'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\node_modules',
//       'C:\\Users\\jacqu\\Documents\\GitHub\\node_modules',
//       'C:\\Users\\jacqu\\Documents\\node_modules',
//       'C:\\Users\\jacqu\\node_modules',   
//       'C:\\Users\\node_modules',
//       'C:\\node_modules'
//     ],
//     [Symbol(kIsMainSymbol)]: true,        
//     [Symbol(kIsCachedByESMLoader)]: false,
//     [Symbol(kURL)]: undefined,
//     [Symbol(kFormat)]: undefined,
//     [Symbol(kIsExecuting)]: true
//   },
//   '3': 'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works\\modules.js',     
//   '4': 'C:\\Users\\jacqu\\Documents\\GitHub\\Nodejs_Express_MongoDB_the-complete-bootcamp\\2-how-node-works'
// }

//console.log(require('module').wrapper);

//module.exports
const Calculator = require('./test-module-1');
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2,5));


//exports shorthand
//const calc2 = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2');

console.log(multiply(2,5));

//caching 
require('./test-module-3')();
//these came from the cache and was retrieved from that location instead of called again
require('./test-module-3')();
require('./test-module-3')();