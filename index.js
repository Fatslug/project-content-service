const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const chalk = require('chalk'); // colorful console

const db = require('./src/db');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({ path: 'env/.env.'+ENV });

// Setup Express
var app = express();
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

// Proper body parsing
app.use(bodyParser.json());

// Routes
const componentRoutes = require('./src/routes/component/component-routes')
app.use('/components', componentRoutes);

// Start app
app.listen(app.get('port'), () => {
	console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), ENV);
});