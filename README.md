# Rate Limiter Exercise

On start up this service loads the following configuration from *config.json* and provides an endpoint `/take` to determine if a configured route is **rate limited**.

This service uses the [Token bucket Algorithm](https://en.wikipedia.org/wiki/Token_bucket) which is a simple traffic shaping or rate limiting technique used in computer networks and systems. It works by maintaining a bucket of tokens at a certain rate. Tokens are added to the bucket at a fixed rate, and when a request or packet arrives, it can only be processed if there are enough tokens in the bucket to cover its cost (in terms of tokens). If there are not enough tokens, the request is either delayed until there are sufficient tokens or dropped. This algorithm helps control the rate of traffic and prevent bursts of data from overwhelming a system or network.

#### Here is an example of a configuration:

```
{
  "rateLimitsPerEndpoint": [
    {
      "endpoint": "GET /user/:id",
      "burst": 10,
      "sustained": 6
    },
    {
      "endpoint": "PATCH /user/:id",
      "burst": 10,
      "sustained": 5
    },
    {
      "endpoint": "POST /userinfo",
      "burst": 300,
      "sustained": 100
    }
  ]
}
```

## Usage

#### To query any of the configured endpoints we use the following path patterns:

```
/take/:verb/:action/:id
/take/:verb/:action
```

#### So to query the 3 routes in the configuration example above:

```
/take/get/user/1234
/take/patch/user/1234
/take/post/userinfo
```

If the limit is not exceeded the service will respond with SUCCESS and the remaining capacity for that endpoint"
```
{
   "message":"SUCCESS",
   "remainingCapacity":9
}
```

If the limit is exceeded the service will respond with RATE LIMITED and the remaining capacity for that endpoint is 0"
```
{
   "message":"RATE LIMITED",
   "remainingCapacity":0
}
```

If the endpoint queried is not found in the configuration then the service will respond with NOT FOUND
```
{
   "message":"NOT FOUND",
   "remainingCapacity":0
}
```

To start service:
```
npm run dev
```

The sevice runs on port 3000:
```
http://localhost:3000/take/:verb/:action/:id
```

To run tests:
```
npm test
```

### Dependencies:
This project depends the following libraries:
- async
- chai
- chai-http
- express
- mocha

### Future Improvements:
- *config.json* is currently hardcoded, it should be configurable by environement variable to make it easier to change configurations
- expose a new endpoint to add configurations to the service while running, maybe it could even back up the old config.json and update it with the new route.
- add better validation when parsing the config file, are there any path patterns that we have not accounted for?
- better error handling and more logging.

### Problems with submitting to work to Code Signal
- I am unable to update main.spec.js, the file is readonly and the import for `const app = require('../main');` needs to be updated to `const app = require('./src/app')` in order for that test to pass
- My tests are hanging after completion, the problem seems to be related to fs.readFileSync not closing file handlers properly? From my research there are two ways to resolve this:
1. to use test library called `supertest`
2. add the `--exit` option when running mocha, e.g. `mocha --exit specs/**.spec.js``

Thank you for this opportuntiy, I hope we have the opportunity to discuss this work as am I curious about how I could have done better :D
