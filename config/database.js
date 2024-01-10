const mongoose = require('mongoose');
const config = require('./index')

const connectDB = async () => {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.MONGODB_URI, connectionOptions);

    console.log('MongoDB connection established');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
    process.exit(1);
  }
});

module.exports = connectDB;
