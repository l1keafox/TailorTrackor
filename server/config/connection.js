const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING  || 'mongodb://127.0.0.1:27017/TicketTractor',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
