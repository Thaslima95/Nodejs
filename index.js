//using http modules
const http = require('http');//includes a http module // built in module
const url=require('url');//url module
//import another user defined modules
const greet=require('./ownModule');

http.createServer(function (req, res)//method used to create HTTP server
 {
//   res.writeHead(200, {'Content-Type': 'text/html'});//HTTP Header 
  //200 indicates status code of the response.OK.
  //400 indicates error
  //404 indicates Not page Found

  res.writeHead(404,{'Content-Type':'text/plain'})//404 status code
//   res.write(greet.ownModule());
//   res.write(req.url);
//   res.end();
   const params = url.parse(req.url, true).query;
  const txt = params.name + " " + params.category;
  res.end(txt);
}).listen(8080);
console.log("server started");