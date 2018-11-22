let mongoose = require('mongoose');

mongoose.connect('mongodb://jrivera30:Chicoguada14uf@ds155903.mlab.com:55903/restapi', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
});

module.exports = mongoose;