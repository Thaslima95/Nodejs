var url = require('url');
var adr = 'http://localhost:8009/urlmodule.htm?category=nodejs&type=3';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8009'
console.log(q.pathname); //returns '/urlmodule.htm'
console.log(q.search); //returns '?category=nodejs&type=3'

var qdata = q.query;
console.log(qdata.category);