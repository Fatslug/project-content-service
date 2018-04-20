const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';

dotenv.load({ path: 'env/.env.'+ENV });

// Connect to MongoDB.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
	console.log('%s Mongo connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', (err) => {
	console.error(err);
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	process.exit();
});

module.exports = mongoose;