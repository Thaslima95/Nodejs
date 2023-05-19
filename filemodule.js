var http = require('http');
var fs=require('fs');//file system module

http.createServer(function (req, res) {
  fs.readFile('file1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8090);

//append the contents to specifiled file if it doesn't exist create a file.
// fs.appendFile('file2.txt', 'Hello File Modules!Adding More contents to the file', function (err) {
//   if (err) throw err;
//   console.log('Saved sucess!');
// });

// fs.open('file2.txt', 'w+', function (err, file) {
//   if (err) throw err;
//   console.log('Write Sucess');
// });

// fs.open('file2.txt', 'w+', function (err, file) {
//   if (err) throw err;
//   console.log('Write Sucess');
// });



// fs.writeFile('file2.txt', 'Replacing the file content', function (err) {
//   if (err) throw err;
//   console.log('Replace sucess!');
// });

// fs.unlink('file3.txt', function (err) {
//   if (err) throw err;
//   console.log('File has been deleted sucessfully!');
// });