const app = require('./src/app')
const configTemplate = require('./src/config/config-template.js');

console.log("Current directory:", __dirname);

/** Load configuration from file */
configTemplate.loadConfiguration('./config.json');

/* Start server */
app.listen(3000, () => console.log('Server is running'));

