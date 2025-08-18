const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // //Solution1: entire file has to be loaded. takes too long and can block processes
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    //Solution2: Streams
    //consumed in chunks and as soon as the piece is avaialbe write and send and next piece and so on...  
    //problem is that this can overwhelm the response stream. This is called back pressure: response can send as fast as it can receive.
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end(); //not passing anything in b/c we passed and read the data with the create read stream
    // });

    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode= 500;
    //     res.end("File not found!");
    // })

    //Solution 3 (backpressure problem solved)
    //pipe the output of readable stream directly into the input of a writeable. the speed is automatically handled on input and output
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
    // readableSource.pipe(writeableDest)<--where the data comes from
    //dest is the response-->(res)
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Listening...");
});