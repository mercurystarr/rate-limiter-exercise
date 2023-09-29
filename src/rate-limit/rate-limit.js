const RateLimitResult =require('./rate-limit-result.js');
const configTemplate = require('../config/config-template.js');

function limitRequests(req, res) {

  const key = `${req.params.verb.toLowerCase()}+${req.params.path.toLowerCase()}`;

  bucket = configTemplate.getConfiguration().get(key);

  if (bucket) {
    if (bucket.take()) {
      res.status(HttpStatus.OK).json(new RateLimitResult('SUCCESS', bucket.tokens));
    } else {
      res.status(HttpStatus.RATE_LIMITED).json(new RateLimitResult('RATE LIMITED', bucket.tokens));
    }
  } else { 
    res.status(HttpStatus.NOT_FOUND).json(new RateLimitResult('NOT FOUND', 0));
  }
};

const HttpStatus = {
  OK: 200,
  RATE_LIMITED: 429,
  NOT_FOUND: 404,
};

module.exports = {
  limitRequests,
};
