const fs = require('fs');
const TokenBucket = require('../rate-limit/token-bucket.js');

const configurationMap = new Map();

const ENDPOINT_RE = new RegExp('(GET|POST|PUT|PATCH|DELETE|OPTIONS)\\s\\/(\\w+)');

function loadConfiguration(filename) {
  try {
    const fileStr = fs.readFileSync(filename, 'utf8');
    setupConfigMap(JSON.parse(fileStr));
  } catch (err) {
    console.log(`Error loading configuration file: ${filename} from disk`, err);
  }
  return configurationMap;
}

function getConfiguration() {
  return configurationMap;
}

// for testing only
function reset() {
  return configurationMap.clear();
  
}

function setupConfigMap(configJson) {
  configJson.rateLimitsPerEndpoint.forEach((entry) => {
    const match = entry.endpoint.match(ENDPOINT_RE);
    if (match) {
      const key = `${match[1].toLowerCase()}+${match[2].toLowerCase()}`;
      configurationMap.set(key, new TokenBucket(entry.burst, entry.sustained));
      console.log(`Adding endpoint to service config:  ${entry.endpoint}, burst: ${entry.burst} , sustained: ${entry.sustained}`);
    } else {
      throw new Error`Failed to configure Rate Limiting service, entrypoint: ${entry.endpoint} is malformed`;
    }
  });
}

module.exports = {
  loadConfiguration,
  getConfiguration,
  reset, // for testing only
};
