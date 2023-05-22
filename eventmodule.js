const events=require('events')
const emitter=new events.EventEmitter();


//adding lsitener to that event
emitter.on('WelcomeEvent',function(){
    console.log('Welcome to Event Module')
})


//Raise an event using emit
emitter.emit('WelcomeEvent')


var fs = require('fs');
var rs = fs.createReadStream('./file2.txt');
rs.on('open', function () {
  console.log('The file is open');
});